import { useState, useContext } from "react";
import { Button, Grid, styled } from "@mui/material";
import { Paragraph } from "components/Typography";
import { FlexBox } from "components/flex-box";
import ProductCard13 from "components/product-cards/ProductCard13";
import CategorySectionCreator from "components/CategorySectionCreator";
import Link from "next/link";
import { LoginContext } from "contexts/LoginContext";
import PaginationRounded from "components/pagination/PaginationRounded";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const SubTitle = styled(Paragraph)(({ theme }) => ({
  fontSize: 12,
  marginTop: "0rem",
  marginBottom: "20px",
  color: "#066344",
}));

// ========================================================

// ========================================================

const AllProducts = ({ products, mainData, title = "All Products" }) => {
  const [pageIndex, setPageIndex] = useState(0);

  console.log("product", products);

  const [getAuthUser, setGetAuthUser] = useContext(LoginContext);
  const { data: authUser } = getAuthUser || {};

  const handlePageChange = (event, value) => {
    setPageIndex(value);
  };
  return (
    <CategorySectionCreator title={title}>
      <SubTitle>Browse through quality agro products for you</SubTitle>

      <Grid container spacing={3}>
        {products?.map((item) => (
          <Grid key={item.id} item md={6} sm={6} xs={12}>
            <ProductCard13
              authUser={authUser}
              id={item.id}
              slug={item?.slug}
              title={item?.title}
              price={item.price}
              off={item.discount}
              rating={item.rating}
              imgUrl={item.images[0]?.url}
              name={item.name}
              description={item.description}
              isPublished={item.isPublished}
              subcategory={item.subcategory}
              countInStock={item.countInStock}
            />
          </Grid>
        ))}
      </Grid>
      <FlexBox justifyContent="center" mt={5}>
        <Stack spacing={2}>
          <Pagination
            count={mainData?.data?.totalPages ?? 5}
            page={pageIndex}
            onChange={handlePageChange}
            color="secondary"
            variant="outlined"
            shape="rounded"
          />
        </Stack>
      </FlexBox>
    </CategorySectionCreator>
  );
};
export default AllProducts;
