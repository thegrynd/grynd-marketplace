import { useState } from "react";
import { useRouter } from "next/router";
import { Box } from "@mui/material";
import * as yup from "yup";
import { H3 } from "components/Typography";
import UpdateCategory from "../../../src/pages-sections/forms/UpdateCategory";
import UpdateSubCategory from "../../../src/pages-sections/forms/UpdateSubCategory";
import VendorDashboardLayout from "components/layouts/vendor-dashboard";
import axios from "axios";
import { parseCookies } from "../../../helpers/validation";
// import api from "utils/__api__/products";

// =============================================================================
EditCategory.getLayout = function getLayout(page) {
  return <VendorDashboardLayout>{page}</VendorDashboardLayout>;
};
// =============================================================================

const INITIAL_VALUES = {
  name: "",
  parent: [],
  featured: false,
};

// form field validation schema
const validationSchema = yup.object().shape({
  name: yup.string().required("required"),
});

export default function EditCategory({ singleCategory }) {
  const { data: currentCategory } = singleCategory;
  console.log("currentCategory", currentCategory);
  const [category, setCategory] = useState({
    ...INITIAL_VALUES,
  });

  // useEffect(() => {
  //   api.getProduct(query.slug as string).then((data) => {
  //     setProduct((state) => ({
  //       ...state,
  //       name: data.title,
  //       price: data.price,
  //       category: data.categories,
  //     }));
  //   });
  // }, [query.slug]);

  const handleFormSubmit = () => {};
  return (
    <>
      <Box py={4}>
        <H3 mb={2} color="#066344">
          Edit Category
        </H3>

        <UpdateCategory
          initialValues={category}
          currentCategory={currentCategory}
        />
      </Box>
      <Box py={4}>
        <H3 mb={2} color="#066344">
          Edit Sub-Category
        </H3>

        <UpdateSubCategory
          initialValues={category}
          currentCategory={currentCategory}
        />
      </Box>
    </>
  );
}

export async function getServerSideProps(context) {
  const { authToken } = parseCookies(context.req);
  const { id } = context.params;
  const url = "https://grynd-staging.vercel.app";

  const config = {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  };

  const authResponse = await axios.get(`${url}/api/v1/auth/me`, config);
  console.log(authResponse.data);
  const authUser = authResponse.data;

  const response = await axios.get(`${url}/api/v2/categories/${id}`, config);
  console.log(response.data.status);
  const singleCategory = response.data;

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
  } else if (authUser.data.role !== "admin") {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { singleCategory, authUser },
  };
}
