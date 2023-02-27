import React, { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import { LoginContext } from "contexts/LoginContext";
import * as Yup from "yup";
import axios from "axios";
import Cookies from "js-cookie";
import { Button, Grid, TextField } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { H3, H5 } from "components/Typography";
import Link from "next/link";
import { useRouter } from "next/router";
import "react-phone-number-input/style.css";
import { ThreeCircles } from "react-loader-spinner";
import PhoneInput from "react-phone-number-input";

const CreateSellerForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [getAuthUser, setGetAuthUser] = useContext(LoginContext);
  const { data: authUser } = getAuthUser || {};
  //   console.log("checking", authUser);

  const [coords, setCoords] = useState();

  useEffect(() => {
    getLocation();
  }, [coords]);

  const getLocation = () => {
    if (!navigator.geolocation) {
      console.log("Geolocation is not supported by your browser");
    } else {
      // setStatus('Locating...');
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // setStatus(null);
          setCoords(
            `${position.coords.latitude}, ${position.coords.longitude}`
          );
          console.log("coords", coords);
        },
        () => {
          console.log("Unable to retrieve your location");
        }
      );
    }
  };

  const submitData = async (values) => {
    const url = "https://grynd-staging.vercel.app";
    const token = Cookies.get("authToken");

    console.log("values", values);
    setIsLoading(true);
    return axios
      .post(`${url}/api/v2/auth/create-account`, values, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("response", response);
        if (response.data.status === true) {
          router.push("/profile");
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  };
  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      accountType: "",
      location: {
        address: "",
        city: "",
        country: "",
        coordinates: "na wa",
      },
      email: "",
      phone: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(5, "Store name must have at least 5 characters")
        .max(15, "Store name must be 15 characters or less")
        .required("Your store name is required"),
      description: Yup.string()
        .max(120, "Must be 20 characters or less")
        .required("Description is required, not more than 120 characters"),
      accountType: Yup.string()
        .max(20, "Must be 20 characters or less")
        .required("Please select account type"),
      location: Yup.object().shape({
        address: Yup.string().required("Please fill in address"),
        city: Yup.string().required("Please fill in city"),
        country: Yup.string().required("Please select country"),
        coordinates: Yup.string().required("Please set your location"),
      }),

      email: Yup.string().email("Invalid email address"),
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
            Create A Seller Account
          </H3>
        </Grid>
        <Grid item md={6} xs={12}>
          <TextField
            fullWidth
            type="text"
            color="info"
            size="medium"
            id="name"
            name="name"
            label="Name of Store"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.username}
            autoComplete={authUser?.data?.country}
          />
          {formik.touched.name && formik.errors.name ? (
            <H5 color="red">{formik.errors.name}</H5>
          ) : null}
        </Grid>
        <Grid item md={6} xs={12}>
          <TextField
            fullWidth
            type="text"
            color="info"
            size="medium"
            id="description"
            name="description"
            label="Description"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.description}
          />
          {formik.touched.description && formik.errors.description ? (
            <H5 color="red">{formik.errors.description}</H5>
          ) : null}
        </Grid>
        <Grid item md={6} xs={12}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Account Type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="accountType"
              name="accountType"
              value={formik.values.accountType}
              label="Account Type"
              onChange={formik.handleChange}
            >
              <MenuItem value="individual">Individual</MenuItem>
              <MenuItem value="cooperate">Cooperate</MenuItem>
              <MenuItem value="registered-business">
                Registered Business
              </MenuItem>
            </Select>
          </FormControl>
          {formik.touched.accountType && formik.errors.accountType ? (
            <H5 color="red">{formik.errors.accountType}</H5>
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
          <TextField
            fullWidth
            color="info"
            type="text"
            size="medium"
            id="location.address"
            name="location.address"
            label="Address"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.location.address}
          />
          {formik.touched.location && formik.errors.location ? (
            <H5 color="red">{formik.errors.location.address}</H5>
          ) : null}
        </Grid>
        <Grid item md={6} xs={12}>
          <TextField
            fullWidth
            color="info"
            type="text"
            size="medium"
            id="location.city"
            name="location.city"
            label="City"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.location.city}
          />
          {formik.touched.location && formik.errors.location ? (
            <H5 color="red">{formik.errors.location.city}</H5>
          ) : null}
        </Grid>
        <Grid item md={6} xs={12}>
          <TextField
            fullWidth
            color="info"
            type="text"
            size="medium"
            id="location.country"
            name="location.country"
            label="Country"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.location.country}
          />
          {formik.touched.location && formik.errors.location ? (
            <H5 color="red">{formik.errors.location.country}</H5>
          ) : null}
        </Grid>
        <Grid item md={6} xs={12}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              User Coordinates
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="location.coordinates"
              name="location.coordinates"
              value={formik.values.location.coordinates}
              label="Coordinates"
              onChange={formik.handleChange}
            >
              <MenuItem value={coords}>{coords || "Get Location"}</MenuItem>
            </Select>
          </FormControl>
          {formik.touched.location?.coordinates &&
          formik.errors.location?.coordinates ? (
            <H5 color="red">{formik.errors.location?.coordinates}</H5>
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
              "Create Seller Account"
            )}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};
export default CreateSellerForm;
