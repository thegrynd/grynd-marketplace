import { useContext } from "react";
import { Button, Grid, styled } from "@mui/material";
import { Paragraph } from "components/Typography";
import { FlexRowCenter } from "components/flex-box";
import ProductCard13 from "components/product-cards/ProductCard13";
import CategorySectionCreator from "components/CategorySectionCreator";
import Link from "next/link";
import { LoginContext } from "contexts/LoginContext";

const SubTitle = styled(Paragraph)(({ theme }) => ({
  fontSize: 12,
  marginTop: "-20px",
  marginBottom: "20px",
  color: theme.palette.grey[600],
}));

// ========================================================

// ========================================================

const FilteredProducts = ({ products, title = "All Products" }) => {
  const [getAuthUser, setGetAuthUser] = useContext(LoginContext);
  const { data: authUser } = getAuthUser || {};
  const { docs } = products?.data || {};
  return (
    <CategorySectionCreator title={title}>
      <SubTitle>Browse through quality agro products for you</SubTitle>

      <Grid container spacing={3}>
        {docs?.map((item) => (
          <Grid key={item.id} item md={6} sm={6} xs={12}>
            <ProductCard13
              id={item.id}
              name={item.name}
              slug={item.slug}
              title={item.title}
              price={item.price}
              off={item.discount}
              rating={item.rating}
              imgUrl={item.images?.[0]?.url}
            />
          </Grid>
        ))}
      </Grid>

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
export default FilteredProducts;
