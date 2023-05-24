import { Box } from "@mui/material";
import * as yup from "yup";
import { H3 } from "components/Typography";
import ProductForm from "pages-sections/forms/ProductForm";
import VendorDashboardLayout from "components/layouts/vendor-dashboard";
import axios from "axios";
import useSWR from "swr";
import Cookies from "js-cookie";

// =============================================================================
CreateProduct.getLayout = function getLayout(page) {
  return <VendorDashboardLayout>{page}</VendorDashboardLayout>;
};
// =============================================================================

export default function CreateProduct() {
  const token = Cookies.get("authToken");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const address = `${process.env.NEXT_PUBLIC_GRYND_URL}/api/v2/subcategories`;

  const fetcher = async (url) => await axios.get(url, config);
  const { data, error } = useSWR(address, fetcher);

  const { data: subcategoryData } = data?.data || {};
  // console.log("subcategoryData", subcategoryData);

  return (
    <Box py={4}>
      <H3 mb={2}>Add New Product</H3>

      <ProductForm subcategoryData={subcategoryData} />
    </Box>
  );
}
