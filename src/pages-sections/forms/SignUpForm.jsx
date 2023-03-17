import React, { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Cookies from "js-cookie";
import { Button, Grid, TextField } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { H3 } from "components/Typography";
import { H5 } from "components/Typography";
import Link from "next/link";
import "react-phone-number-input/style.css";
import { ThreeCircles } from "react-loader-spinner";

import { useRouter } from "next/router";
import PhoneInput from "react-phone-number-input";

const SignUpForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const submitData = async (values) => {
    const url = "https://grynd-staging.vercel.app";

    // console.log("values", values);
    setIsLoading(true);
    return axios
      .post(`${url}/api/v1/auth/register`, values, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        // console.log("response", response);
        if (response.data.status === true) {
          Cookies.set("VerificationToken", response.data.verificationKey);
          Cookies.set("SignUpToken", response.data.token);
          router.push("/vendor/signup-success");
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  };
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      gender: "",
      phone: "",
      password: "",
      country: "",
      surname: "",
      firstname: "",
      referralCode: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(5, "Username must have at least 5 characters")
        .max(15, "Username must be 15 characters or less")
        .matches(
          /^[a-zA-Z0-9@]+$/,
          "Username cannot contain white space and special character"
        )
        .required("Required"),
      firstname: Yup.string()
        .max(20, "Must be 20 characters or less")
        .required("Required"),
      surname: Yup.string()
        .max(20, "Must be 20 characters or less")
        .required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      gender: Yup.string().required("Please select your gender"),
      password: Yup.string()
        .min(
          8,
          "Password must include a special character eg: @ ? & $ and must be at least 8 characters"
        )
        .max(20)
        .required(),
      country: Yup.string().required("Country is required"),
    }),
    onSubmit: async (values) => {
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
            Register on Grynd{" "}
          </H3>
        </Grid>
        <Grid item md={6} xs={12}>
          <TextField
            fullWidth
            type="text"
            color="info"
            size="medium"
            id="username"
            name="username"
            label="Username"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.username}
            // error={!!formik. && !!errors.username}
            // helperText={touched.username && errors.username}
          />
          {formik.touched.username && formik.errors.username ? (
            <H5 color="red">{formik.errors.username}</H5>
          ) : null}
        </Grid>
        <Grid item md={6} xs={12}>
          <TextField
            fullWidth
            type="text"
            color="info"
            size="medium"
            id="firstname"
            name="firstname"
            label="First Name"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.firstname}
            // error={!!touched.firstname && !!errors.firstname}
            // helperText={touched.firstname && errors.firstname}
          />
          {formik.touched.firstname && formik.errors.firstname ? (
            <H5 color="red">{formik.errors.firstname}</H5>
          ) : null}
        </Grid>
        <Grid item md={6} xs={12}>
          <TextField
            fullWidth
            type="text"
            color="info"
            size="medium"
            id="surname"
            name="surname"
            label="Surname"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.surname}
            // error={!!touched.surname && !!errors.surname}
            // helperText={touched.surname && errors.surname}
          />
          {formik.touched.surname && formik.errors.surname ? (
            <H5 color="red">{formik.errors.surname}</H5>
          ) : null}
        </Grid>
        <Grid item md={6} xs={12}>
          <TextField
            fullWidth
            color="info"
            type="email"
            size="medium"
            id="email"
            name="email"
            label="E-mail"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email ? (
            <H5 color="red">{formik.errors.email}</H5>
          ) : null}
        </Grid>
        <Grid item md={6} xs={12}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Gender</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="gender"
              name="gender"
              value={formik.values.gender}
              label="Gender"
              onChange={formik.handleChange}
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
            </Select>
          </FormControl>
          {formik.touched.gender && formik.errors.gender ? (
            <H5 color="red">{formik.errors.gender}</H5>
          ) : null}
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
          />
          {formik.touched.password && formik.errors.password ? (
            <H5 color="red">{formik.errors.password}</H5>
          ) : null}
        </Grid>
        <Grid item md={6} xs={12}>
          <TextField
            fullWidth
            type="text"
            color="info"
            size="medium"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            name="country"
            id="country"
            label="Country"
            value={formik.values.country}
          />
          {formik.touched.country && formik.errors.country ? (
            <H5 color="red">{formik.errors.country}</H5>
          ) : null}
        </Grid>

        <Grid item md={6} xs={12}>
          <PhoneInput
            placeholder="+234080000000000"
            defaultCountry="RW"
            value={formik.values.phone}
            onChange={(e) => formik.setFieldValue("phone", e)}
            onBlur={formik.handleBlur("phone")}
          />
          {formik.touched.phone && formik.errors.phone ? (
            <H5 color="red">{formik.errors.phone}</H5>
          ) : null}
        </Grid>

        <Grid item md={6} xs={12}>
          <TextField
            fullWidth
            type="text"
            color="info"
            size="medium"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            name="referralCode"
            id="referralCode"
            label="Referral Code (Optional)"
            value={formik.values.referralCode}
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
            {isLoading ? (
              <ThreeCircles
                height="30"
                width="30"
                color="#fff"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel="three-circles-rotating"
                outerCircleColor=""
                innerCircleColor=""
                middleCircleColor=""
              />
            ) : (
              "Sign Up For Grynd"
            )}
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
  );
};
export default SignUpForm;
