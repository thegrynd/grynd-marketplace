import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Box } from "@mui/material";
import * as yup from "yup";
import { H3 } from "components/Typography";
import Button from "@mui/material/Button";
import UpdateProduct from "pages-sections/forms/UpdateProduct";
import VendorDashboardLayout from "components/layouts/vendor-dashboard";
import axios from "axios";
import Cookies from "js-cookie";
import useSWR, { preload } from "swr";
// import api from "utils/__api__/products";

// =============================================================================
UploadProduct.getLayout = function getLayout(page) {
  return <VendorDashboardLayout>{page}</VendorDashboardLayout>;
};
// =============================================================================

export default function UploadProduct() {
  const { query } = useRouter();
  const [show, setShow] = useState(false);
  const token = Cookies.get("authToken");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const address = `${process.env.NEXT_PUBLIC_GRYND_URL}/api/v2/products/${query.id}`;

  const fetcher = async (url) => await axios.get(url, config);
  const { data, error } = useSWR(address, fetcher);

  // preload in effects;
  useEffect(() => {
    preload(address, fetcher);
  }, []);

  const { data: singleProductData } = data?.data || {};
  console.log("singleProductData", singleProductData);

  return (
    <Box py={4}>
      <H3 mb={2}>Edit Product</H3>
      <Button
        type="button"
        color="info"
        variant="contained"
        sx={{
          mt: 4,
          backgroundColor: "#FF0000",
          // width: "100px",
          ":hover": {
            backgroundColor: "grey",
          },
        }}
        onClick={() => {
          setShow(!show);
          preload(address, fetcher);
        }}
      >
        {show ? "Close Form" : "Edit Product"}
      </Button>
      {show ? (
        <UpdateProduct singleProductData={singleProductData} query={query} />
      ) : null}
    </Box>
  );
}
