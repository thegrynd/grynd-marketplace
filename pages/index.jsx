import { Fragment, useCallback, useEffect, useState } from "react";
import axios from "axios";
import { Button, Stack } from "@mui/material";
import SEO from "components/SEO";
import Setting from "components/Setting";
import HomeLayout from "components/layouts/HomeLayout";
import SidenavContainer from "components/SidenavContainer";
import SideNavbar from "components/page-sidenav/SideNavbar";
import Section1 from "pages-sections/landing/Section1";
import Section2 from "pages-sections/landing/Section2";
import AllProducts from "pages-sections/grocery1/AllProducts";
import DiscountSection from "pages-sections/grocery1/DiscountSection";
import ProductCarousel from "pages-sections/grocery1/ProductCarousel";
import { MobileNavigationBar2 } from "components/mobile-navigation";
import api from "utils/__api__/grocery1-shop";
import Header from "../src/pages-sections/landing/Header";
import Store from "../src/contexts/Store";
import Footer from "../src/pages-sections/landing/Footer";

const HomePage = (props) => {
  console.log("props", props);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filterProducts, setFilterProducts] = useState([]);

  // FETCH PRODUCTS BASED ON THE SELECTED CATEGORY
  useEffect(() => {
    axios
      .get("/api/grocery-1/category-based-products", {
        params: {
          category: selectedCategory,
        },
      })
      .then(({ data }) => {
        console.log("data", data);
        setFilterProducts(data);
      });
  }, [selectedCategory]);

  // HANDLE CHANGE CATEGORY
  const handleSelectCategory = (category) => setSelectedCategory(category);

  // SIDE NAVBAR COMPONENT
  const SideNav = useCallback(
    () => (
      <SideNavbar
        navList={props.grocery1NavList}
        handleSelect={handleSelectCategory}
      />
    ),
    [props.grocery1NavList]
  );
  return (
    <>
      <Store>
        <Header />
      </Store>
      <HomeLayout showNavbar={false} showTopbar={false}>
        <SEO title="Grynd Agro Marketplace" />
        {/* TOP HERO AREA */}
        <Section1 id="search" />

        {/* SERVICE AREA */}
        <Section2 id="services" />

        {/* SIDEBAR WITH OTHER CONTENTS */}
        <SidenavContainer
          navFixedComponentID="grocery1Services"
          SideNav={SideNav}
        >
          <Stack spacing={6} mt={2}>
            {selectedCategory ? (
              // FILTERED PRODUCT LIST

              <Store>
                <AllProducts
                  products={filterProducts}
                  title={selectedCategory}
                />
              </Store>
            ) : (
              <Fragment>
                {/* POPULAR PRODUCTS AREA */}
                <ProductCarousel
                  title="Tuber Products"
                  products={props.popularProducts}
                />
                {/* TRENDING PRODUCTS AREA */}
                <ProductCarousel
                  title="Vegetable Products"
                  products={props.trendingProducts}
                />
                <ProductCarousel
                  title="Grain Products"
                  products={props.trendingProducts}
                />
                <ProductCarousel
                  title="Fruit Products"
                  products={props.trendingProducts}
                />
              </Fragment>
            )}

            {/* DISCOUNT BANNER AREA */}
            <DiscountSection />

            {/* FOOTER AREA */}
            <Footer />
          </Stack>
        </SidenavContainer>

        {/* POPUP NEWSLETTER FORM */}
        {/* <Newsletter image="/assets/images/newsletter/bg-2.png" /> */}

        {/* SETTINGS IS USED ONLY FOR DEMO, YOU CAN REMOVE THIS */}
        <Setting />

        {/* MOBILE NAVIGATION WITH SIDE NAVABAR */}
        <MobileNavigationBar2>
          <SideNavbar navList={props.grocery1NavList} />
        </MobileNavigationBar2>
      </HomeLayout>
    </>
  );
};
export const getStaticProps = async () => {
  const products = await api.getProducts();
  const serviceList = await api.getServices();
  const popularProducts = await api.getPopularProducts();
  const trendingProducts = await api.getTrendingProducts();
  const grocery1NavList = await api.getGrocery1Navigation();
  return {
    props: {
      products,
      serviceList,
      grocery1NavList,
      popularProducts,
      trendingProducts,
    },
  };
};
export default HomePage;
