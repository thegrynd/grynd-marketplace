import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "contexts/LoginContext";
import { useFormik } from "formik";
import * as yup from "yup";
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

import { useRouter } from "next/router";
import PhoneInput from "react-phone-number-input";

// form field validation
const validationSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  surname: yup.string().required("Please fill in your surname"),
  firstname: yup.string().required("Please fill in your first name"),
  email: yup.string().required("email is required"),
  gender: yup.string().required("Please select your gender"),
  phone: yup.string().required("Please "),
  password: yup.string().required("username is required"),
  country: yup.string().required("username is required"),
  referralCode: yup.string().optional(),
});

const SignUpForm = () => {
  const router = useRouter();
  const [value, setValue] = useState();

  const submitData = async (values) => {
    const url = "https://grynd-staging.vercel.app";

    console.log("values", values);

    return axios
      .post(`${url}/api/v1/auth/register`, values, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("response", response);
        if (response.status === true) {
          router.push("/vendor/login-user");
        }
      })
      .catch((err) => {
        console.log(err);
      });
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
            // error={!!touched.email && !!errors.email}
            // helperText={touched.email && errors.email}
          />
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
        </Grid>
        {/* <Grid item md={6} xs={12}>
          <TextField
            fullWidth
            type="tel"
            color="info"
            size="medium"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            name="phone"
            id="phone"
            label="Phone"
            value={formik.values.phone}
            // error={!!touched.phone && !!errors.phone}
            // helperText={touched.phone && errors.phone}
          />
        </Grid> */}
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
            // error={!!touched.country && !!errors.country}
            // helperText={touched.country && errors.country}
          />
        </Grid>

        <Grid item md={6} xs={12}>
          <PhoneInput
            placeholder="+234080000000000"
            value={value}
            onChange={setValue}
          />
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
            // error={!!touched.referralCode && !!errors.referralCode}
            // helperText={touched.referralCode && errors.referralCode}
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
  );
};
export default SignUpForm;
