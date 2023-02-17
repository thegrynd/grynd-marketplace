import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "contexts/AuthContext";
import { Formik } from "formik";
import * as yup from "yup";
import { Button, Grid, TextField } from "@mui/material";
import { H3 } from "components/Typography";
import { H5 } from "components/Typography";
import Link from "next/link";

// form field validation
const validationSchema = yup.object().shape({
  cropName: yup.string().required("crop name is required"),
  cropSize: yup.string().required("crop size is required"),
  cropCategory: yup.string().required("select a category for the crop"),
  cropDescription: yup.string().required("crop description is required"),
});

const SignUpForm = () => {
  const [user, setUser] = useContext(AuthContext);
  useEffect(() => {
    console.log(user);
  }, [user]);

  const initialValues = {
    email: "",
    password: "",
  };

  const handleFormSubmit = async (values) => {
    values.preventDefault();
    console.log("hey", values);
  };
  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={initialValues}
      validationSchema={validationSchema}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => (
        <form
          onSubmit={handleFormSubmit}
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
                Create A Seller Account{" "}
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
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                type="password"
                color="info"
                size="medium"
                onBlur={handleBlur}
                onChange={handleChange}
                name="password"
                id="password"
                label="Password"
                value={values.password}
                error={!!touched.password && !!errors.password}
                helperText={touched.password && errors.password}
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
                Already have a seller account?{" "}
                <span style={{ color: "#066344" }}>
                  <Link href="../vendor/login-user"> Log in</Link>
                </span>
              </H5>
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  );
};

export default SignUpForm;
