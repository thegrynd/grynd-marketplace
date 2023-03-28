import { useEffect, useState, useContext } from "react";
import { Box, styled, useTheme, Button } from "@mui/material";
import useWindowSize from "hooks/useWindowSize";
import { Paragraph } from "components/Typography";
import { FlexRowCenter } from "components/flex-box";
import Carousel from "components/carousel/Carousel";
import ProductCard13 from "components/product-cards/ProductCard13";
import CategorySectionCreator from "components/CategorySectionCreator";
import { LoginContext } from "contexts/LoginContext";
import Link from "next/link";

const SubTitle = styled(Paragraph)(({ theme }) => ({
  fontSize: 12,
  marginTop: "-20px",
  marginBottom: "20px",
  color: theme.palette.grey[600],
}));

// =================================================================

// =================================================================

const ProductCarousel = ({ products, title }) => {
  const [getAuthUser, setGetAuthUser] = useContext(LoginContext);
  const { data: authUser } = getAuthUser || {};
  const width = useWindowSize();
  const { palette, shadows } = useTheme();
  const [visibleSlides, setVisibleSlides] = useState(3);

  const { docs } = products?.data || {};
  console.log("docs", docs);
  useEffect(() => {
    if (width < 500) setVisibleSlides(1);
    else if (width < 650) setVisibleSlides(2);
    else if (width < 950) setVisibleSlides(3);
    else setVisibleSlides(3);
  }, [width]);
  return (
    <CategorySectionCreator
      title={title}
      seeMoreLink="/product/all-products"
      mb={0}
    >
      <SubTitle>Best collection in 2021 for you!</SubTitle>

      <Carousel
        infinite={true}
        totalSlides={docs?.length}
        visibleSlides={visibleSlides}
        sx={{
          "& #backArrowButton, #backForwardButton": {
            width: 40,
            height: 40,
            background: "#fff",
            boxShadow: shadows[2],
            color: "#066344",
          },
        }}
      >
        {docs?.map((item) => (
          <Box pb={2} key={item.id}>
            <ProductCard13
              id={item.id}
              slug={item.slug}
              title={item.title}
              price={item.price}
              off={item.discount}
              rating={item.rating}
              imgUrl={item.images[0]?.url}
            />
          </Box>
        ))}
      </Carousel>
      {authUser?.success === true && (
        <FlexRowCenter mt={6}>
          <Link href="../vendor/upload-product" passHref legacyBehavior>
            <a target="_blank">
              <Button
                color="primary"
                variant="contained"
                sx={{
                  mx: "auto",
                  mt: "2.25rem",
                  display: "block",
                  minWidth: "125px",
                  backgroundColor: "#066344",
                }}
                disabled
              >
                Upload Your Product
              </Button>
            </a>
          </Link>
        </FlexRowCenter>
      )}
    </CategorySectionCreator>
  );
};
export default ProductCarousel;
