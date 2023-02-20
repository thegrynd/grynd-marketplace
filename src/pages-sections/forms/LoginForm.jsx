import React from "react";
import { useFormik } from "formik";
import axios from "axios";
import Cookies from "js-cookie";

import * as Yup from "yup";
import { Button, Grid, TextField } from "@mui/material";
import { H3 } from "components/Typography";
import { H5 } from "components/Typography";
import Link from "next/link";
import { useRouter } from "next/router";

const LoginForm = () => {
  const router = useRouter();
  const submitData = async (values) => {
    const url = "https://grynd-staging.vercel.app";

    // console.log(values);

    return axios
      .post(`${url}/api/v1/auth/login`, values, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("response", response);
        if (response) {
          Cookies.set("authToken", response.data.token);
          router.push("/");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      // await new Promise((r) => setTimeout(r, 500));
      // alert(JSON.stringify(values, null, 2));
      // console.log(values);
      submitData(values);
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      encType="multipart/form-data"
      style={{
        marginTop: "5rem",
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Grid
        container
        spacing={3}
        md={8}
        p={8}
        sx={{ backgroundColor: "white" }}
      >
        <Grid item md={12} xs={12}>
          {" "}
          <H3 textAlign="center" color="#066344">
            Login To Your Account{" "}
          </H3>
        </Grid>
        <Grid item md={6} xs={12}>
          <TextField
            fullWidth
            color="info"
            size="medium"
            id="email"
            name="email"
            label="E-mail"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.email}

            // error={!!touched.email && !!errors.email}
            // helperText={touched.email && errors.email}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <TextField
            fullWidth
            type="password"
            color="info"
            size="medium"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            name="password"
            id="password"
            label="Password"
            value={formik.values.password}
            // error={!!touched.password && !!errors.password}
            // helperText={touched.password && errors.password}
          />
        </Grid>

        <Grid item xs={12}>
          <Button
            type="submit"
            color="info"
            variant="contained"
            sx={{
              mt: 4,
              backgroundColor: "#066344",
              ":hover": {
                backgroundColor: "grey",
              },
            }}
          >
            Login
          </Button>
        </Grid>
        <Grid item xs={12}>
          <H5>
            Don&apos;t have a seller account?{" "}
            <span style={{ color: "#066344" }}>
              <Link href="../vendor/signup-user"> Create One</Link>
            </span>
          </H5>
        </Grid>
      </Grid>
    </form>
  );
};
export default LoginForm;

// const LoginForm = () => {
//   const initialValues = {
// email: "",
// password: "",
//   };

//   const handleFormSubmit = async (values) => {
//     console.log(values);
//   };

//   return (
//     <Formik
//       onSubmit={handleFormSubmit}
//       initialValues={initialValues}
//       validationSchema={validationSchema}
//     >
//       {({
//         values,
//         errors,
//         touched,
//         handleChange,
//         handleBlur,
//         handleSubmit,
//         isSubmitting,
//       }) => (
//         <form
//           onSubmit={handleSubmit}
//           encType="multipart/form-data"
//           style={{
//             marginTop: "5rem",
//             textAlign: "center",
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//           }}
//         >
// <Grid
//   container
//   spacing={3}
//   md={8}
//   p={8}
//   sx={{ backgroundColor: "white" }}
// >
// <Grid item md={12} xs={12}>
//   {" "}
//   <H3 textAlign="center" color="#066344">
//     Login To Your Account{" "}
//   </H3>
// </Grid>
// <Grid item md={6} xs={12}>
//   <TextField
//     fullWidth
//     color="info"
//     size="medium"
//     id="email"
//     name="email"
//     label="E-mail"
//     onBlur={handleBlur}
//     onChange={handleChange}
//     value={values.email}
//     error={!!touched.email && !!errors.email}
//     helperText={touched.email && errors.email}
//   />
// </Grid>
// <Grid item md={6} xs={12}>
//   <TextField
//     fullWidth
//     type="password"
//     color="info"
//     size="medium"
//     onBlur={handleBlur}
//     onChange={handleChange}
//     name="password"
//     id="password"
//     label="Password"
//     value={values.password}
//     error={!!touched.password && !!errors.password}
//     helperText={touched.password && errors.password}
//   />
// </Grid>

// <Grid item xs={12}>
//   <Button
//     type="submit"
//     color="info"
//     variant="contained"
//     sx={{
//       mt: 4,
//       backgroundColor: "#066344",
//       ":hover": {
//         backgroundColor: "grey",
//       },
//     }}
//   >
//     Login
//   </Button>
// </Grid>
// <Grid item xs={12}>
//   <H5>
//     Don&apos;t have a seller account?{" "}
//     <span style={{ color: "#066344" }}>
//       <Link href="../vendor/signup-user"> Create One</Link>
//     </span>
//   </H5>
// </Grid>
//           </Grid>
//         </form>
//       )}
//     </Formik>
//   );
// };

// export default LoginForm;
