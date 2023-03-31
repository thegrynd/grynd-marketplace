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
import { H3, H5 } from "components/Typography";
import Link from "next/link";
import { useRouter } from "next/router";
import "react-phone-number-input/style.css";
import { ThreeCircles } from "react-loader-spinner";
import PhoneInput from "react-phone-number-input";
import PreviewImage from "./PreviewImage";

const CreateSellerForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const [coords, setCoords] = useState();

  const [resData1, setResData1] = useState();
  const [resPublicId1, setResPublicId1] = useState();
  const [resData2, setResData2] = useState();
  const [resPublicId2, setResPublicId2] = useState();

  const [inputFile1, setInputFile1] = useState();
  const [inputFile2, setInputFile2] = useState();

  const [errorMsg, setErrorMsg] = useState();

  useEffect(() => {
    getLocation();
  }, [coords]);

  useEffect(() => {
    uploadCoverImageToCloudinary();
  }, [inputFile1]);

  useEffect(() => {
    uploadLogoToCloudinary();
  }, [inputFile2]);

  useEffect(() => {
    formik.setFieldValue("coverImage.url", resData1);
    formik.setFieldValue("coverImage.public_id", resPublicId1);
    formik.setFieldValue("logo.url", resData2);
    formik.setFieldValue("logo.public_id", resPublicId2);
  }, [resData1, resData2, resPublicId1, resPublicId2]);

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
    const token = Cookies.get("authToken");

    console.log("values", values);
    setIsLoading(true);

    return axios
      .post(
        `${process.env.NEXT_PUBLIC_GRYND_URL}/api/v2/auth/create-account`,
        values,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log("response", response);
        if (response.data.status === true) {
          router.replace("/profile");
        }
      })
      .catch((err) => {
        console.log(err);
        setErrorMsg(err.response.data.validationErrors);
      })
      .finally(() => setIsLoading(false));
  };

  const uploadCoverImageToCloudinary = async () => {
    const coverUrl = inputFile1;
    const formData = new FormData();
    try {
      formData.append("file", coverUrl);
      formData.append("upload_preset", "a7plbqa0");
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/grynd/image/upload",
        formData
      );
      // console.log("res1", res);
      setResData1(() => res.data.secure_url);
      setResPublicId1(() => res.data.public_id);
    } catch (error) {
      console.log(error);
    }
  };

  const uploadLogoToCloudinary = async () => {
    const logourl = inputFile2;
    const formData = new FormData();
    try {
      formData.append("file", logourl);
      formData.append("upload_preset", "a7plbqa0");
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/grynd/image/upload",
        formData
      );
      // console.log("res2", res);
      setResData2(() => res.data.secure_url);
      setResPublicId2(() => res.data.public_id);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCoverInput = (e) => {
    setInputFile1(e.target.files[0]);
    uploadCoverImageToCloudinary();
  };

  const handleLogoInput = (e) => {
    setInputFile2(e.target.files[0]);
    uploadLogoToCloudinary();
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
        coordinates: "",
      },
      socialHandles: {
        facebook: "",
        instagram: "",
        youtube: "",
        twitter: "",
      },
      coverImage: {
        public_id: "",
        url: resData1,
      },
      logo: {
        public_id: "",
        url: resData2,
      },
      email: "",
      phone: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(5, "Store name must have at least 5 characters")
        .max(20, "Store name must be 15 characters or less")
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
      socialHandles: Yup.object().shape({
        facebook: Yup.string().required("Must be a valid url"),
        instagram: Yup.string().required("Must be a valid url"),
        youtube: Yup.string().required("Must be a valid url"),
        twitter: Yup.string().required("Must be a valid url"),
      }),
      coverImage: Yup.object().shape({
        public_id: Yup.string(),
        url: Yup.string(),
      }),
      logo: Yup.object().shape({
        public_id: Yup.string(),
        url: Yup.string(),
      }),
      email: Yup.string().email("Invalid email address"),
      // phone: Yup.string().min(10).max(14).required(),
    }),
    onSubmit: (values) => {
      setTimeout(() => {
        submitData(values);
      }, 10000);
      console.log("form-values", values);
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
            value={formik.values.name}
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
          {formik.values.coverImage && <PreviewImage file={inputFile1} />}
          <TextField
            fullWidth
            color="info"
            type="file"
            size="medium"
            id="coverImage.url"
            name="coverImage.url"
            label="Cover Image"
            onBlur={formik.handleBlur}
            onChange={(e) => handleCoverInput(e)}
            value={undefined}
          />
          {formik.touched.coverImage && formik.errors.coverImage ? (
            <H5 color="red">{formik.errors.coverImage.url}</H5>
          ) : null}
        </Grid>
        <Grid item md={6} xs={12}>
          {formik.values.logo && <PreviewImage file={inputFile2} />}
          <TextField
            fullWidth
            color="info"
            type="file"
            size="medium"
            id="logo.url"
            name="logo.url"
            label=" Brand Logo"
            onBlur={formik.handleBlur}
            onChange={(e) => handleLogoInput(e)}
            value={undefined}
          />
          {formik.touched.logo && formik.errors.logo ? (
            <H5 color="red">{formik.errors.logo.url}</H5>
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
          <TextField
            fullWidth
            defaultValue="facebook.com"
            color="info"
            type="url"
            size="medium"
            id="socialHandles.facebook"
            name="socialHandles.facebook"
            placeholder="https://www.facebook.com/you"
            label="Facebook "
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.socialHandles.facebook}
          />
          {formik.touched.socialHandles && formik.errors.socialHandles ? (
            <H5 color="red">{formik.errors.socialHandles.facebook}</H5>
          ) : null}
        </Grid>

        <Grid item md={6} xs={12}>
          <TextField
            fullWidth
            defaultValue="instagram.com"
            color="info"
            type="url"
            size="medium"
            id="socialHandles.instagram"
            name="socialHandles.instagram"
            placeholder="https://www.instagram.com/you"
            label="Instagram"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.socialHandles.instagram}
          />
          {formik.touched.socialHandles && formik.errors.socialHandles ? (
            <H5 color="red">{formik.errors.socialHandles.instagram}</H5>
          ) : null}
        </Grid>
        <Grid item md={6} xs={12}>
          <TextField
            fullWidth
            defaultValue="youtube.com"
            color="info"
            type="url"
            size="medium"
            id="socialHandles.youtube"
            name="socialHandles.youtube"
            placeholder="https://youtube.com/you"
            label="YouTube"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.socialHandles.youtube}
          />
          {formik.touched.socialHandles && formik.errors.socialHandles ? (
            <H5 color="red">{formik.errors.socialHandles.youtube}</H5>
          ) : null}
        </Grid>
        <Grid item md={6} xs={12}>
          <TextField
            fullWidth
            defaultValue="twitter.com"
            color="info"
            type="url"
            size="medium"
            id="socialHandles.twitter"
            name="socialHandles.twitter"
            placeholder="https://twitter.com/you"
            label="Twitter"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.socialHandles.twitter}
          />
          {formik.touched.socialHandles && formik.errors.socialHandles ? (
            <H5 color="red">{formik.errors.socialHandles.twitter}</H5>
          ) : null}
        </Grid>

        <Grid item md={6} xs={12}>
          <PhoneInput
            placeholder="Input Phone"
            defaultCountry="RW"
            value={formik.values.phone}
            onChange={(e) => formik.setFieldValue("phone", e)}
            onBlur={formik.handleBlur("phone")}
          />
          {formik.touched.phone && formik.errors.phone ? (
            <H5 color="red">{formik.errors.phone}</H5>
          ) : null}
        </Grid>
        {/* <div> {errorMsg}</div> */}
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
