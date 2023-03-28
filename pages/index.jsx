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
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filterProducts, setFilterProducts] = useState([]);
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
    axios
      .get("/api/grocery-1/category-based-products", {
        params: {
          category: selectedCategory,
        },
      })
      .then(({ data }) => {
        // console.log("data", data);
        setFilterProducts(data);
      });
  }, [selectedCategory]);

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
        <Store>
          <Section1 id="search" />
        </Store>

        {/* SERVICE AREA */}
        <Section2 id="services" />

        {/* SIDEBAR WITH OTHER CONTENTS */}
        <SidenavContainer
          navFixedComponentID="grocery1Services"
          SideNav={SideNav}
        >
          {authUser?.data.isSeller === true ? (
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
                    <ProductCarousel
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
              <DiscountSection />

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

// export async function getServerSideProps(context) {
//   const { authToken } = parseCookies(context.req);

// const url = "https://grynd-staging.vercel.app";

//   const response = await axios.get(`${url}/api/v2/products`, {
//     headers: {
//       Authorization: `Bearer ${authToken}`,
//     },
//   });
//   console.log(response.data.status);
//   const sellerAllProducts = response.data;

//   if (!authToken) {
//     return {
//       redirect: {
//         destination: "/vendor/login-user",
//         permanent: false,
//       },
//     };
//   }
//   return {
//     props: { sellerAllProducts },
//   };
// }

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
