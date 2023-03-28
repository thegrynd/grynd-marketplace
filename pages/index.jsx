import { Fragment, useCallback, useEffect, useState, useContext } from "react";
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
import FilteredProducts from "pages-sections/grocery1/FilteredProducts";
import DiscountSection from "pages-sections/grocery1/DiscountSection";
import ProductCarousel from "pages-sections/grocery1/ProductCarousel";
import { MobileNavigationBar2 } from "components/mobile-navigation";
import api from "utils/__api__/grocery1-shop";
import Header from "../src/pages-sections/landing/Header";
import Store from "../src/contexts/Store";
import Footer from "../src/pages-sections/landing/Footer";
import { LoginContext } from "contexts/LoginContext";
import Cookies from "js-cookie";

const HomePage = (props) => {
  console.log("categoryData", props.categoryData);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [filterProducts, setFilterProducts] = useState([]);
  const [filterSubProducts, setFilterSubProducts] = useState([]);
  // const [categoryData, setCategoryData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sellerProducts, setSellerProducts] = useState([]);

  const [getAuthUser, setGetAuthUser] = useContext(LoginContext);
  const { data: authUser } = getAuthUser || {};
  // console.log("authUser", authUser);

  const url = "https://grynd-staging.vercel.app";
  const token = Cookies.get("authToken");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  // FETCH PRODUCTS BASED ON THE SELECTED CATEGORY
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${url}/api/v2/categories/${selectedCategory}`)
      .then(({ data }) => {
        setFilterProducts(data);
        console.log("filterCategoryData", filterProducts);
      })
      .catch((err) => err)
      .finally(() => setIsLoading(false));
  }, [selectedCategory]);

  // FETCH PRODUCTS BASED ON THE SELECTED SUBCATEGORY
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${url}/api/v2/subcategories/${selectedSubCategory}`)
      .then(({ data }) => {
        setFilterSubProducts(data);
        console.log("filterSubCategoryData", filterSubProducts);
      })
      .catch((err) => err)
      .finally(() => setIsLoading(false));
  }, [selectedSubCategory]);

  useEffect(() => {
    console.log("updated", filterSubProducts);
  }, [filterSubProducts]);

  // FETCH ALL PRODUCTS FOR A SELLER ACCOUNT
  useEffect(() => {
    if (authUser?.data.isSeller === true) {
      setIsLoading(true);
      axios
        .get(`${url}/api/v2/products`, config)
        .then(({ data }) => {
          setSellerProducts(data);
          // console.log("sellerProducts", sellerProducts);
        })
        .catch((err) => err)
        .finally(() => setIsLoading(false));
    }
  }, [authUser]);

  // HANDLE CHANGE CATEGORY
  const handleSelectCategory = (category) => setSelectedCategory(category);
  const handleSelectSubCategory = (subcategory) =>
    setSelectedSubCategory(subcategory);

  // SIDE NAVBAR COMPONENT
  const SideNav = useCallback(
    () => (
      <SideNavbar
        navList={props.categoryData.data.docs}
        handleSelect={handleSelectCategory}
        handleSelectSub={handleSelectSubCategory}
      />
    ),
    [props.categoryData]
  );
  return (
    <>
      <Store>
        <Header />
      </Store>
      <HomeLayout showNavbar={false} showTopbar={false}>
        <SEO title="Grynd Agro Marketplace" />
        {/* TOP HERO AREA */}
        <Store>
          <Section1 id="search" />
        </Store>

        {/* SIDEBAR WITH OTHER CONTENTS */}
        <SidenavContainer
          navFixedComponentID="grocery1Services"
          SideNav={SideNav}
        >
          {authUser?.data.isSeller === true &&
          authUser?.data.role !== "admin" ? (
            <Stack spacing={6} mt={2}>
              {selectedCategory ? (
                // FILTERED PRODUCT LIST

                <Store>
                  <FilteredProducts
                    products={filterProducts}
                    title={selectedCategory}
                  />
                </Store>
              ) : selectedSubCategory ? (
                <Store>
                  <FilteredProducts
                    products={filterSubProducts}
                    title={selectedSubCategory}
                  />
                </Store>
              ) : (
                <Fragment>
                  <Store>
                    <AllProducts
                      products={sellerProducts}
                      title="All Products"
                    />
                  </Store>

                  {/* POPULAR PRODUCTS AREA */}
                  {/* <Store>
                    <ProductCarousel
                      title="All Products"
                      products={sellerProducts}
                    />
                  </Store> */}
                  {/* TRENDING PRODUCTS AREA */}
                  {/* <ProductCarousel
                    title="Vegetable Products"
                    products={props.trendingProducts}
                  /> */}
                </Fragment>
              )}

              {/* DISCOUNT BANNER AREA */}
              {/* <DiscountSection /> */}
              {/* SERVICE AREA */}
              <Section2 id="services" />

              {/* FOOTER AREA */}
              <Footer />
            </Stack>
          ) : authUser?.data.role === "admin" ? (
            <Stack spacing={6} mt={2}>
              {selectedCategory ? (
                // FILTERED PRODUCT LIST

                <Store>
                  <AllProducts
                    products={sellerProducts}
                    title={selectedCategory}
                  />
                </Store>
              ) : (
                <Fragment>
                  {/* POPULAR PRODUCTS AREA */}
                  <Store>
                    <AllProducts
                      title="All Products"
                      products={sellerProducts}
                    />
                  </Store>
                  {/* TRENDING PRODUCTS AREA */}
                  {/* <ProductCarousel
                    title="Vegetable Products"
                    products={props.trendingProducts}
                  /> */}
                </Fragment>
              )}

              {/* DISCOUNT BANNER AREA */}
              {/* <DiscountSection /> */}
              {/* SERVICE AREA */}
              <Section2 id="services" />

              {/* FOOTER AREA */}
              <Footer />
            </Stack>
          ) : null}
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

export async function getServerSideProps() {
  const url = "https://grynd-staging.vercel.app";

  const response = await axios.get(`${url}/api/v2/categories`);
  const categoryData = response.data;

  return {
    props: { categoryData },
  };
}

// export const getStaticProps = async () => {
//   const products = await api.getProducts();
//   const serviceList = await api.getServices();
//   const popularProducts = await api.getPopularProducts();
//   const trendingProducts = await api.getTrendingProducts();
//   const grocery1NavList = await api.getGrocery1Navigation();
//   return {
//     props: {
//       products,
//       serviceList,
//       grocery1NavList,
//       popularProducts,
//       trendingProducts,
//     },
//   };
// };
export default HomePage;
