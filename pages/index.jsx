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
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sellerProducts, setSellerProducts] = useState([]);
  const [clientProducts, setClientProducts] = useState([]);

  // state for sorting products
  const [sortProduct, setSortProduct] = useState("");

  // state to contain searched products
  const [searchedProduct, setSearchedProduct] = useState([]);

  // state to contain main data for paginating
  const [mainData, setMainData] = useState([]);

  // state to receive search terms
  const [searchValue, setSearchValue] = useState("");

  const [getAuthUser, setGetAuthUser] = useContext(LoginContext);
  const { data: authUser } = getAuthUser || {};

  console.log("authUser", authUser);

  const token = Cookies.get("authToken");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  let urlClient = `${process.env.NEXT_PUBLIC_GRYND_URL}/api/v2/client/products?`;
  let urlSeller = `${process.env.NEXT_PUBLIC_GRYND_URL}/api/v2/products?`;

  // FETCH ALL PRODUCTS FOR SELLER
  useEffect(() => {
    if (authUser?.data.isSeller === true) {
      setIsLoading(true);
      axios
        .get(urlSeller, config)
        .then(({ data }) => {
          setSellerProducts(data);
          // console.log("sellerProducts", sellerProducts);
        })
        .catch((err) => err)
        .finally(() => setIsLoading(false));
    }
  }, [authUser, urlSeller]);

  // FETCH ALL PRODUCTS FOR CLIENT OR NOT LOGGED IN USER
  useEffect(() => {
    if (
      authUser?.data.isSeller === false ||
      (!authUser && authUser === undefined)
    ) {
      setIsLoading(true);
      axios
        .get(urlClient)
        .then(({ data }) => {
          setClientProducts(data);
        })
        .catch((err) => err)
        .finally(() => setIsLoading(false));
    }

    switch (sortProduct) {
      case "priceLowToHigh":
        setIsLoading(true);
        axios
          .get(
            `${process.env.NEXT_PUBLIC_GRYND_URL}/api/v2/client/products?sort=priceLowToHigh`
          )
          .then(({ data }) => {
            setClientProducts(data);
          })
          .catch((err) => err)
          .finally(() => setIsLoading(false));
        break;
      case "priceHighToLow":
        setIsLoading(true);
        axios
          .get(
            `${process.env.NEXT_PUBLIC_GRYND_URL}/api/v2/client/products?sort=priceHighToLow`
          )
          .then(({ data }) => {
            setClientProducts(data);
          })
          .catch((err) => err)
          .finally(() => setIsLoading(false));
        break;
      case "createdAt":
        setIsLoading(true);
        axios
          .get(
            `${process.env.NEXT_PUBLIC_GRYND_URL}/api/v2/client/products?sort=createdAt`
          )
          .then(({ data }) => {
            setClientProducts(data);
          })
          .catch((err) => err)
          .finally(() => setIsLoading(false));
        break;
      case "rating":
        setIsLoading(true);
        axios
          .get(
            `${process.env.NEXT_PUBLIC_GRYND_URL}/api/v2/client/products?sort=rating`
          )
          .then(({ data }) => {
            setClientProducts(data);
          })
          .catch((err) => err)
          .finally(() => setIsLoading(false));
        break;
      default:
        setIsLoading(true);
        axios
          .get(urlClient)
          .then(({ data }) => {
            setClientProducts(data);
          })
          .catch((err) => err)
          .finally(() => setIsLoading(false));
        break;
    }
  }, [authUser, sortProduct]);

  // seller data
  const { docs: allProductsSeller } = sellerProducts?.data || {};
  console.log("allProductsSeller", allProductsSeller);

  // client data
  const { docs: allProductsClient } = clientProducts?.data || {};
  // console.log("allProductsClient", allProductsClient);

  // console.log("searchedProduct", searchedProduct);

  // FILTER PRODUCTS BY SEARCH
  useEffect(() => {
    if (authUser?.data.isSeller === true) {
      setSearchedProduct(allProductsSeller);
      const filteredProductsSeller = allProductsSeller?.filter((item) =>
        item.name.toLowerCase().includes(searchValue)
      );

      setSearchedProduct(filteredProductsSeller);
      setMainData(sellerProducts);
    } else if (
      authUser?.data.isSeller === false ||
      (!authUser && authUser === undefined)
    ) {
      setSearchedProduct(allProductsClient);
      const filteredProductsClient = allProductsClient?.filter((item) =>
        item.name.toLowerCase().includes(searchValue)
      );

      setSearchedProduct(filteredProductsClient);
      setMainData(clientProducts);
    }
  }, [allProductsClient, allProductsSeller, searchValue]);

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
        setCategoryProducts(data);
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
      {/* <Store> */}
      <Header />
      {/* </Store> */}

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
          {authUser?.data.isSeller === true ? (
            <>
              <SearchProduct
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                setSortProduct={setSortProduct}
                sortProduct={sortProduct}
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
                      mainData={mainData}
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
          ) : authUser?.data.isSeller === false ? (
            <>
              <SearchProduct
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                setSortProduct={setSortProduct}
                sortProduct={sortProduct}
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
            <>
              <SearchProduct
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                setSortProduct={setSortProduct}
                sortProduct={sortProduct}
              />
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
            </>
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

export default HomePage;
