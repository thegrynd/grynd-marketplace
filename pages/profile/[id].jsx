import React, { useState, useEffect, useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Cookies from "js-cookie";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { ThreeCircles } from "react-loader-spinner";
import { CameraEnhance, Person } from "@mui/icons-material";
import { Avatar, Box, Button, Grid, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Card1 from "components/Card1";
import { FlexBox } from "components/flex-box";
import UserDashboardHeader from "components/header/UserDashboardHeader";
import CustomerDashboardLayout from "components/layouts/customer-dashboard";
import CustomerDashboardNavigation from "components/layouts/customer-dashboard/Navigations";
import { H3 } from "components/Typography";
import { H5 } from "components/Typography";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { parseCookies } from "../../helpers/validation";
// ===========================================================

const ProfileEditor = ({ authUser }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const [coords, setCoords] = useState();
  const { data: user } = authUser || {};
  console.log("user", user);

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
      .put(`${url}/api/v2/auth/update-account`, values, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("response", response);
        if (response.data.status === true) {
          router.replace("/profile");
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  };

  // SECTION TITLE HEADER LINK
  const HEADER_LINK = (
    <Link href="/profile" passHref>
      <Button
        color="primary"
        sx={{
          px: 4,
          bgcolor: "primary.light",
        }}
      >
        Back to Profile
      </Button>
    </Link>
  );

  // const INITIAL_VALUES = {
  //   email: user.email || "",
  //   contact: user.phone || "",
  //   last_name: user.name.lastName || "",
  //   first_name: user.name.firstName || "",
  //   birth_date: user.dateOfBirth || new Date()
  // };

  const formik = useFormik({
    initialValues: {
      name: user.sellerAccount.storeName || "",
      description: user.sellerAccount.description,
      accountType: user.sellerAccount.accountType,
      location: {
        address: user.sellerAccount.location.address,
        city: user.sellerAccount.location.city,
        country: user.sellerAccount.location.country,
        coordinates: "",
      },
      socialHandles: {
        facebook: "https://facebook.com",
        instagram: "https://instagram.com",
        youtube: "https://youtube.com",
        twitter: "https://twitter.com",
      },
      email: user.email,
      phone: user.phone,
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
      socialHandles: Yup.object().shape({
        facebook: Yup.string().required("Must be a valid url"),
        instagram: Yup.string().required("Must be a valid url"),
        youtube: Yup.string().required("Must be a valid url"),
        twitter: Yup.string().required("Must be a valid url"),
      }),

      email: Yup.string().email("Invalid email address"),
      // phone: Yup.string().min(10).max(14).required(),
    }),
    onSubmit: async (values) => {
      submitData(values);
    },
  });

  // Show a loading state when the fallback is rendered
  if (router.isFallback) {
    return <h1>Loading...</h1>;
  }
  return (
    <CustomerDashboardLayout>
      {/* TITLE HEADER AREA */}
      <UserDashboardHeader
        icon={Person}
        title="Edit Profile"
        button={HEADER_LINK}
        navigation={<CustomerDashboardNavigation />}
      />

      {/* PROFILE EDITOR FORM */}
      <Card1>
        <FlexBox alignItems="flex-end" mb={3}>
          <Avatar
            src="/assets/images/faces/ralph.png"
            sx={{
              height: 64,
              width: 64,
            }}
          />

          <Box ml={-2.5}>
            <label htmlFor="profile-image">
              <Button
                component="span"
                color="secondary"
                sx={{
                  p: "8px",
                  height: "auto",
                  bgcolor: "grey.300",
                  borderRadius: "50%",
                }}
              >
                <CameraEnhance fontSize="small" />
              </Button>
            </label>
          </Box>

          <Box display="none">
            <input
              onChange={(e) => console.log(e.target.files)}
              id="profile-image"
              accept="image/*"
              type="file"
            />
          </Box>
        </FlexBox>

        <form
          onSubmit={formik.handleSubmit}
          encType="multipart/form-data"
          style={{
            // marginTop: "5rem",
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
            p={1}
            sx={{ backgroundColor: "white" }}
          >
            <Grid item md={12} xs={12}>
              {" "}
              <H3 textAlign="center" color="#066344">
                Update Account Details{" "}
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
                // autoComplete={authUser?.data?.country}
              />
              {formik.touched.name && formik.errors.name ? (
                <H5 color="red">{formik.errors.name}</H5>
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
                <InputLabel id="demo-simple-select-label">
                  Account Type
                </InputLabel>
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
              <TextField
                fullWidth
                defaultValue="facebook.com"
                color="info"
                type="url"
                size="medium"
                id="socialHandles.facebook"
                name="socialHandles.facebook"
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
                label=" Instagram"
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
                  "Update Details"
                )}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Card1>
    </CustomerDashboardLayout>
  );
};

export async function getServerSideProps(context) {
  const { authToken } = parseCookies(context.req);

  const url = "https://grynd-staging.vercel.app";

  const response = await axios.get(`${url}/api/v1/auth/me`, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
  const authUser = response.data;
  if (!authToken) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: { authUser },
  };
}
export default ProfileEditor;

{
  /* <Formik
onSubmit={handleFormSubmit}
initialValues={INITIAL_VALUES}
validationSchema={checkoutSchema}
>
{({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  handleSubmit,
  setFieldValue,
}) => (
  <form onSubmit={handleSubmit}>
    <Box mb={4}>
      <Grid container spacing={3}>
        <Grid item md={6} xs={12}>
          <TextField
            fullWidth
            name="first_name"
            label="First Name"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.first_name}
            error={!!touched.first_name && !!errors.first_name}
            helperText={touched.first_name && errors.first_name}
          />
        </Grid>

        <Grid item md={6} xs={12}>
          <TextField
            fullWidth
            name="last_name"
            label="Last Name"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.last_name}
            error={!!touched.last_name && !!errors.last_name}
            helperText={touched.last_name && errors.last_name}
          />
        </Grid>

        <Grid item md={6} xs={12}>
          <TextField
            fullWidth
            name="email"
            type="email"
            label="Email"
            onBlur={handleBlur}
            value={values.email}
            onChange={handleChange}
            error={!!touched.email && !!errors.email}
            helperText={touched.email && errors.email}
          />
        </Grid>

        <Grid item md={6} xs={12}>
          <TextField
            fullWidth
            label="Phone"
            name="contact"
            onBlur={handleBlur}
            value={values.contact}
            onChange={handleChange}
            error={!!touched.contact && !!errors.contact}
            helperText={touched.contact && errors.contact}
          />
        </Grid>

        <Grid item md={6} xs={12}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Birth Date"
              maxDate={new Date()}
              value={values.birth_date}
              inputFormat="dd MMMM, yyyy"
              renderInput={(props) => (
                <TextField
                  fullWidth
                  size="small"
                  helperText={touched.birth_date && errors.birth_date}
                  error={
                    (!!touched.birth_date && !!errors.birth_date) ||
                    props.error
                  }
                  {...props}
                />
              )}
              onChange={(newValue) =>
                setFieldValue("birth_date", newValue)
              }
            />
          </LocalizationProvider>
        </Grid>
      </Grid>
    </Box>

    <Button type="submit" variant="contained" color="primary">
      Save Changes
    </Button>
  </form>
)}
</Formik> */
}
