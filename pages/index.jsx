import { Fragment, useCallback, useEffect, useState, useContext } from "react";
import axios from "axios";
import { Button, Stack } from "@mui/material";
import SearchProduct from "../src/components/product-search/SearchProduct";
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
import { parseCookies } from "../helpers/validation";

const HomePage = (props) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filterProducts, setFilterProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sellerProducts, setSellerProducts] = useState([]);
  const [clientProducts, setClientProducts] = useState([]);

  // state to contain filtered repos
  const [searchedProduct, setSearchedProduct] = useState([]);

  // state to receive search terms
  const [searchValue, setSearchValue] = useState("");

  const [getAuthUser, setGetAuthUser] = useContext(LoginContext);
  const { data: authUser } = getAuthUser || {};
  // console.log("authUser", authUser);

  const token = Cookies.get("authToken");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  // FETCH ALL PRODUCTS FOR SELLER
  useEffect(() => {
    if (authUser?.data.isSeller === true) {
      setIsLoading(true);
      axios
        .get(`${process.env.NEXT_PUBLIC_GRYND_URL}/api/v2/products`, config)
        .then(({ data }) => {
          setSellerProducts(data);
          // console.log("sellerProducts", sellerProducts);
        })
        .catch((err) => err)
        .finally(() => setIsLoading(false));
    }
  }, [authUser]);

  // FETCH ALL PRODUCTS FOR CLIENT OR NOT LOGGED IN USER
  useEffect(() => {
    if (
      authUser?.data.isSeller === false ||
      (!authUser && authUser === undefined)
    ) {
      setIsLoading(true);
      axios
        .get(`${process.env.NEXT_PUBLIC_GRYND_URL}/api/v2/client/products`)
        .then(({ data }) => {
          setClientProducts(data);
        })
        .catch((err) => err)
        .finally(() => setIsLoading(false));
    }
  }, [authUser]);

  // seller
  const { data: allProductsSeller } = sellerProducts;
  console.log("allProducts", allProductsSeller);

  // client
  // const { data: allProductsClient } = clientProducts;

  const { docs: allProductsClient } = clientProducts?.data || {};
  // const { docs } = allProductsClient || {};
  console.log("allProductsClient", allProductsClient);

  console.log("searchedProduct", searchedProduct);

  // FILTER PRODUCTS BY SEARCH
  useEffect(() => {
    setSearchedProduct(allProductsClient);

    const filteredProducts = allProductsClient?.filter((item) =>
      item.name.toLowerCase().includes(searchValue)
    );

    setSearchedProduct(filteredProducts);
  }, [allProductsClient, searchValue]);

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
                  <AllProducts products={allProductsSeller} title="" />

                  {/* <Store>
                    <ProductCarousel
                      title="All Products"
                      products={sellerProducts}
                    />
                  </Store> */}
                </Fragment>
              )}

              {/* DISCOUNT BANNER AREA */}
              <DiscountSection />

              {/* FOOTER AREA */}
              <Footer />
            </Stack>
          ) : authUser?.data.isSeller === false ? (
            <>
              <SearchProduct
                searchValue={searchValue}
                setSearchValue={setSearchValue}
              />
              <Stack spacing={6} mt={2}>
                {selectedCategory ? (
                  // FILTERED PRODUCT LIST

                  <AllProducts
                    // products={allProductsClient}
                    title={selectedCategory}
                  />
                ) : (
                  <Fragment>
                    {/* POPULAR PRODUCTS AREA */}
                    <AllProducts
                      products={searchedProduct}
                      setSearchedProduct={setSearchedProduct}
                      title=""
                    />

                    {/* <Store>
                  <ProductCarousel
                    title="All Products"
                    products={sellerProducts}
                  />
                </Store> */}
                  </Fragment>
                )}

                {/* DISCOUNT BANNER AREA */}
                <DiscountSection />

                {/* FOOTER AREA */}
                <Footer />
              </Stack>
            </>
          ) : !authUser ? (
            <Stack spacing={6} mt={2}>
              {selectedCategory ? (
                // FILTERED PRODUCT LIST

                <Store>
                  <AllProducts
                    // products={allProductsClient}
                    title={selectedCategory}
                  />
                </Store>
              ) : (
                <Fragment>
                  {/* POPULAR PRODUCTS AREA */}
                  <AllProducts products={searchedProduct} title="" />

                  {/* <Store>
                  <ProductCarousel
                    title="All Products"
                    products={sellerProducts}
                  />
                </Store> */}
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

//   if (!authToken) {
//     return {
//       redirect: {
//         destination: "/",
//         permanent: false,
//       },
//     };
//   }

//   const url = "https://grynd-staging.vercel.app";

//   const response = await axios.get(`${url}/api/v2/products`, {
//     headers: {
//       Authorization: `Bearer ${authToken}`,
//     },
//   });

//   const sellerAllProducts = response.data;

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
