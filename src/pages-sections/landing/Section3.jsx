import Link from "next/link";
import { Box, Button, Container, Grid, styled } from "@mui/material";
import { FlexRowCenter } from "components/flex-box";
import { H2, H4, Paragraph, Span } from "components/Typography";
import PageCard from "./PageCard";
const FilterButton = styled(Button)(({ theme, selected }) => ({
  color: selected ? theme.palette.primary.main : "inherit",
  ":hover": {
    backgroundColor: "transparent",
    color: theme.palette.primary.main,
  },
}));
const TitleBadge = styled(Span)(({ theme }) => ({
  color: theme.palette.grey[500],
  margin: "0 4px",
}));

// ==================================================================

// ==================================================================

const Section3 = ({ filterDemo, setFilterDemo }) => {
  const pages = [
    ...demoPageList,
    ...shopPageList,
    ...vendorPageList,
    ...customerPageList,
  ];

  return (
    <Box
      mb={14}
      id="demos"
      sx={{
        background:
          "url(/assets/images/landing/landing-bg-2.svg) center/contain no-repeat",
      }}
    >
      <Container
        id="section-3"
        sx={{
          position: "relative",
        }}
      >
        <Box maxWidth="830px" mx="auto" mb="2.5rem" textAlign="center">
          {/* <H4 color="primary.main" fontSize="58px" fontWeight="900">
            58+
          </H4>

          <Paragraph color="primary.main" fontSize="18px">
            Server side rendered
          </Paragraph> */}

          <H2
            mb={4}
            fontSize={28}
            fontWeight="700"
            textAlign="center"
            color="secondary.main"
            textTransform="uppercase"
          >
            Products and Categories
          </H2>
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12}>
            <FlexRowCenter gap={1} flexWrap="wrap">
              <FilterButton
                disableRipple
                onClick={() => setFilterDemo("")}
                selected={filterDemo === "" ? 1 : 0}
              >
                All
              </FilterButton>

              <FilterButton
                disableRipple
                onClick={() => setFilterDemo("homepage")}
                selected={filterDemo === "homepage" ? 1 : 0}
              >
                Homepages
              </FilterButton>

              <FilterButton
                disableRipple
                onClick={() => setFilterDemo("shop")}
                selected={filterDemo === "shop" ? 1 : 0}
              >
                Shop
              </FilterButton>

              <FilterButton
                disableRipple
                onClick={() => setFilterDemo("user")}
                selected={filterDemo === "user" ? 1 : 0}
              >
                User Dashboard
              </FilterButton>

              <FilterButton
                disableRipple
                onClick={() => setFilterDemo("admin")}
                selected={filterDemo === "admin" ? 1 : 0}
              >
                Admin Dashboard
              </FilterButton>
            </FlexRowCenter>
          </Grid>

          {pages
            .filter((item) =>
              filterDemo !== "" ? item.page === filterDemo : true
            )
            .map((item, i) => (
              <Grid item lg={4} sm={6} xs={12} key={i}>
                <PageCard {...item} />
              </Grid>
            ))}
        </Grid>

        <Link href="https://tinyurl.com/get-bazaar" passHref legacyBehavior>
          <a>
            <Button
              color="primary"
              variant="contained"
              sx={{
                mx: "auto",
                mt: "2.25rem",
                display: "block",
                minWidth: "125px",
              }}
            >
              Purchase Now
            </Button>
          </a>
        </Link>
      </Container>
    </Box>
  );
};
const demoPageList = [
  {
    imgUrl: "/assets/images/landing/home/super-store.jpg",
    previewUrl: "/market-1",
    title: (
      <>
        Market <TitleBadge>(1)</TitleBadge>
      </>
    ),
    page: "homepage",
  },
  {
    imgUrl: "/assets/images/landing/home/market-2.jpg",
    previewUrl: "/market-2",
    title: (
      <>
        Market <TitleBadge>(2)</TitleBadge>
      </>
    ),
    page: "homepage",
    status: "New",
  },
  {
    imgUrl: "/assets/images/landing/home/fashion-2.jpg",
    previewUrl: "/fashion-shop-2",
    title: (
      <>
        Fashion <TitleBadge>(2)</TitleBadge>
      </>
    ),
    page: "homepage",
    status: "New",
  },
  {
    imgUrl: "/assets/images/landing/home/gift-shop.jpg",
    previewUrl: "/gift-shop",
    title: "Gift",
    page: "homepage",
  },
  {
    imgUrl: "/assets/images/landing/home/grocery1.jpg",
    previewUrl: "/grocery1",
    title: (
      <>
        Grocery <TitleBadge>(1)</TitleBadge>
      </>
    ),
    page: "homepage",
  },
  {
    imgUrl: "/assets/images/landing/home/gadget-electronics.jpg",
    previewUrl: "/gadget-shop",
    title: "Gadget & Electronics",
    page: "homepage",
  },
  {
    imgUrl: "/assets/images/landing/home/furniture.jpg",
    previewUrl: "/furniture-shop",
    title: "Furniture",
    page: "homepage",
  },
  {
    imgUrl: "/assets/images/landing/home/grocery2.jpg",
    previewUrl: "/grocery2",
    title: (
      <>
        Grocery <TitleBadge>(2)</TitleBadge>
      </>
    ),
    page: "homepage",
  },
  {
    imgUrl: "/assets/images/landing/home/grocery3.jpg",
    previewUrl: "/grocery3",
    title: (
      <>
        Grocery <TitleBadge>(3)</TitleBadge>
      </>
    ),
    page: "homepage",
  },
  {
    imgUrl: "/assets/images/landing/home/healthbeauty.jpg",
    previewUrl: "/healthbeauty-shop",
    title: "Health and Beauty",
    page: "homepage",
  },
  {
    imgUrl: "/assets/images/landing/page-3.png",
    previewUrl: "/fashion-shop-1",
    title: (
      <>
        Fashion <TitleBadge>(1)</TitleBadge>
      </>
    ),
    page: "homepage",
  },
  {
    imgUrl: "/assets/images/landing/home/fashion-3.jpg",
    previewUrl: "/fashion-shop-3",
    title: (
      <>
        Fashion <TitleBadge>(3)</TitleBadge>
      </>
    ),
    page: "homepage",
    status: "New",
  },
];
const shopPageList = [
  {
    imgUrl: "/assets/images/landing/shop/sale-page-1.jpg",
    previewUrl: "/sale-page-1",
    title: "Sale Page",
    page: "shop",
  },
  {
    imgUrl: "/assets/images/landing/shop/sale-page-2.jpg",
    previewUrl: "/sale-page-2",
    title: "Sale Page (Small Navigation)",
    page: "shop",
  },
  {
    imgUrl: "/assets/images/landing/shop/vendor-store.jpg",
    previewUrl: "/shops/scarlett-beauty",
    title: "Vendor Shop",
    page: "shop",
  },
];
const vendorPageList = [
  {
    imgUrl: "/assets/images/landing/vendor/dashboard.jpg",
    previewUrl: "/vendor/dashboard",
    title: "Dashboard",
    status: "New",
    page: "admin",
  },
  {
    imgUrl: "/assets/images/landing/vendor/product-list.jpg",
    previewUrl: "/admin/products",
    title: "Product List",
    status: "New",
    page: "admin",
  },
  {
    imgUrl: "/assets/images/landing/vendor/create-product.jpg",
    previewUrl: "/admin/products/create",
    title: "Create Product",
    status: "New",
    page: "admin",
  },
];
const customerPageList = [
  {
    imgUrl: "/assets/images/landing/customer/profile.jpg",
    previewUrl: "/profile",
    title: "Profile",
    page: "user",
  },
];
export default Section3;
