import { useState } from "react";
import { useRouter } from "next/router";
import { Box, Container, styled, Tab, Tabs } from "@mui/material";
import { H2 } from "components/Typography";
import ShopLayout1 from "components/layouts/ShopLayout1";
import ProductIntro from "components/products/ProductIntro";
import ProductReview from "components/products/ProductReview";
import AvailableShops from "components/products/AvailableShops";
import RelatedProducts from "components/products/RelatedProducts";
import FrequentlyBought from "components/products/FrequentlyBought";
import ProductDescription from "components/products/ProductDescription";
import {
  getFrequentlyBought,
  getRelatedProducts,
} from "utils/__api__/related-products";
import api from "utils/__api__/products";
import { parseCookies } from "../../../helpers/validation";
import axios from "axios";

// styled component
const StyledTabs = styled(Tabs)(({ theme }) => ({
  minHeight: 0,
  marginTop: 80,
  marginBottom: 24,
  borderBottom: `1px solid ${theme.palette.text.disabled}`,
  "& .inner-tab": {
    minHeight: 40,
    fontWeight: 600,
    textTransform: "capitalize",
  },
}));

// ===============================================================

// ===============================================================

const ProductDetailsSeller = ({ sellerSingleProduct }, props) => {
  const { frequentlyBought, relatedProducts, product } = props;

  const { data: singleProduct } = sellerSingleProduct || {};
  console.log("singleProduct", singleProduct);

  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState(0);
  const handleOptionClick = (_, value) => setSelectedOption(value);

  // Show a loading state when the fallback is rendered
  if (router.isFallback) {
    return <h1>Loading...</h1>;
  }

  return (
    <ShopLayout1>
      <Container
        sx={{
          my: 4,
        }}
      >
        {/* PRODUCT DETAILS INFO AREA */}
        {<ProductIntro product={singleProduct} />}

        {/* PRODUCT DESCRIPTION AND REVIEW */}
        <StyledTabs
          textColor="primary"
          value={selectedOption}
          indicatorColor="primary"
          onChange={handleOptionClick}
        >
          <Tab className="inner-tab" label="Description" />
          <Tab className="inner-tab" label="Review (3)" />
        </StyledTabs>

        <Box mb={6}>
          {selectedOption === 0 && <ProductDescription />}
          {selectedOption === 1 && <ProductReview />}
        </Box>

        {/* {frequentlyBought && (
          <FrequentlyBought productsData={frequentlyBought} />
        )} */}

        {/* <AvailableShops /> */}

        {/* {relatedProducts && <RelatedProducts productsData={relatedProducts} />} */}
      </Container>
    </ShopLayout1>
  );
};

// export const getStaticPaths = async () => {
//   const paths = await api.getSlugs();
//   return {
//     paths: paths,
//     //indicates that no page needs be created at build time
//     fallback: "blocking", //indicates the type of fallback
//   };
// };

export async function getServerSideProps(context) {
  const { authToken } = parseCookies(context.req);
  const { id } = context.params;

  const url = "https://grynd-staging.vercel.app";

  const response = await axios.get(`${url}/api/v2/products/${id}`, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
  console.log(response.data.status);
  const sellerSingleProduct = response.data;

  if (!authToken) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: { sellerSingleProduct },
  };
}

// export const getStaticProps = async ({ params }) => {
//   const relatedProducts = await getRelatedProducts();
//   const frequentlyBought = await getFrequentlyBought();
//   const product = await api.getProduct(params.slug);
//   return {
//     props: {
//       frequentlyBought,
//       relatedProducts,
//       product,
//     },
//   };
// };
export default ProductDetailsSeller;
