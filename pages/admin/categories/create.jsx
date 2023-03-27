import { Box } from "@mui/material";
import * as yup from "yup";
import { H3 } from "components/Typography";
import { CategoryForm } from "pages-sections/admin";
import SubCategoryForm from "../../../src/pages-sections/forms/SubCategoryForm";
import VendorDashboardLayout from "components/layouts/vendor-dashboard";
import axios from "axios";
import { parseCookies } from "../../../helpers/validation";

// import api from "utils/__api__/products";

// =============================================================================
CreateCategory.getLayout = function getLayout(page) {
  return <VendorDashboardLayout>{page}</VendorDashboardLayout>;
};
// =============================================================================

export default function CreateCategory({ categoryIdData }) {
  return (
    <>
      <Box py={4}>
        <H3 mb={2} color="#066344">
          Create A New Category
        </H3>

        <CategoryForm />
      </Box>
      <Box py={4}>
        <H3 mb={2} color="#066344">
          Create A New Sub-Category
        </H3>

        <SubCategoryForm categoryIdData={categoryIdData} />
      </Box>
    </>
  );
}

export async function getServerSideProps(context) {
  const { authToken } = parseCookies(context.req);
  const url = "https://grynd-staging.vercel.app";

  const config = {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  };

  const authResponse = await axios.get(`${url}/api/v1/auth/me`, config);
  console.log(authResponse.data);
  const authUser = authResponse.data;

  const categoryResponse = await axios.get(`${url}/api/v2/categories`, config);
  console.log(authResponse.data);
  const categoryIdData = categoryResponse.data;

  if (authUser.success === false) {
    return {
      notFound: true,
    };
  }

  if (!authToken) {
    return {
      redirect: {
        destination: "/vendor/login-user",
        permanent: false,
      },
    };
  }

  if (authUser.data.role !== "admin") {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { authUser, categoryIdData },
  };
}
