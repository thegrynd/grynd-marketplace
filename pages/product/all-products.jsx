import React from "react";
import AllProducts from "pages-sections/grocery1/AllProducts";
import api from "utils/__api__/grocery1-shop";
import Header from "../../src/pages-sections/landing/Header";
import Store from "../../src/contexts/Store";
import { Fragment } from "react";
import Footer from "../../src/pages-sections/landing/Footer";

const Products = (props) => {
  return (
    <Fragment>
      <Store>
        <Header />
      </Store>
      {/* ALL PRODUCTS AREA */}
      <div style={{ marginTop: "2rem" }}>
        <AllProducts products={props.products} />
      </div>
      <Footer />
    </Fragment>
  );
};

export const getStaticProps = async () => {
  const products = await api.getProducts();
  return {
    props: {
      products,
    },
  };
};
export default Products;
