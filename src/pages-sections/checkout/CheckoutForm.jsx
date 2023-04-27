import React, { useState, useContext } from "react";
import { useFormik } from "formik";
import axios from "axios";
import Cookies from "js-cookie";
import Card1 from "components/Card1";
import * as Yup from "yup";
import { Button, Grid, TextField } from "@mui/material";
import { LoginContext } from "contexts/LoginContext";

import Link from "next/link";
import { useRouter } from "next/router";
import { ThreeCircles } from "react-loader-spinner";
import { useAppContext } from "contexts/AppContext";
import Typography from "@mui/material/Typography";
import Autocomplete from "@mui/material/Autocomplete";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import countryList from "data/countryList";
import { Paragraph } from "components/Typography";
import { IconContext } from "react-icons";
import { FaShippingFast } from "react-icons/fa";
import { MdPayments } from "react-icons/md";

// import { checkout } from "lib";

const LoginForm = () => {
  const router = useRouter();
  const { state } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setError] = useState("");

  const [clientSecret, setClientSecret] = useContext(LoginContext);

  const [sameAsShipping, setSameAsShipping] = useState(false);

  const handleCheckboxChange = (values, setFieldValue) => (e, _) => {
    const checked = e.currentTarget.checked;
    setSameAsShipping(checked);
    setFieldValue(
      "billingAddress.fullName",
      checked ? values.shippingAddress.fullName : ""
    );
    setFieldValue(
      "billingAddress.address",
      checked ? values.shippingAddress.address : ""
    );
    setFieldValue(
      "billingAddress.city",
      checked ? values.shippingAddress.city : ""
    );
    setFieldValue(
      "billingAddress.zipCode",
      checked ? values.shippingAddress.zipCode : ""
    );
    setFieldValue(
      "billingAddress.country",
      checked ? values.shippingAddress.country : ""
    );
  };

  const cartList = state.cart;

  // const handleCheckout = (event) => {
  //   event.preventDefault();
  //   checkout(cartList);
  // };

  const submitData = async (values) => {
    const token = Cookies.get("authToken");
    console.log(values);

    return axios
      .post(
        `${process.env.NEXT_PUBLIC_GRYND_URL}/api/v2/client/orders`,
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
        if (response) {
          setClientSecret(response.data.data.clientSecret);

          setTimeout(() => {
            router.push("/payment");
          }, 5000);
        }
      })
      .catch((error) => {
        if (error.response) {
          console.log("server responded", error.response.data.message);
          setError(error.response.data.message);
        } else if (error.request) {
          setError("network error");
        } else {
          setError(error.toJSON(error));
        }
      })
      .finally(() => setIsLoading(false));
  };

  const formik = useFormik({
    initialValues: {
      orderItems: cartList.map((order) => {
        return {
          product: {
            name: order?.name,
            id: order?.id,
          },
          quantity: order?.qty,
        };
      }),

      shippingAddress: {
        fullName: "",
        address: "",
        city: "",
        zipCode: "",
        country: "",
      },
      billingAddress: {
        fullName: "",
        address: "",
        city: "",
        zipCode: "",
        country: "",
      },
      paymentMethod: "",
    },
    // validationSchema: Yup.object({
    //   name: Yup.string()
    //     .min(5, "Store name must have at least 5 characters")
    //     .max(20, "Store name must be 15 characters or less")
    //     .required("Your store name is required"),
    // }),
    onSubmit: async (values) => {
      // await new Promise((r) => setTimeout(r, 500));
      // alert(JSON.stringify(values, null, 2));
      setIsLoading(true);
      setTimeout(() => {
        submitData(values);
      }, 4000);

      handleCheckout();
      console.log("myValues", values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
      <Typography fontWeight="700" mb={2} sx={{ color: "#066344" }}>
        Shipping Address{" "}
        <IconContext.Provider value={{ color: "#B28A3D", size: "1.25rem" }}>
          <FaShippingFast />
        </IconContext.Provider>
      </Typography>
      <Card1
        sx={{
          mb: 4,
        }}
      >
        <Grid container spacing={3} p={8} sx={{ backgroundColor: "white" }}>
          <TextField
            fullWidth
            sx={{
              mb: 2,
              border: "#066344 solid 1px",
              borderRadius: "5px",
              outline: "none",
            }}
            label="Full Name"
            onBlur={formik.handleBlur}
            name="shippingAddress.fullName"
            id="shippingAddress.fullName"
            onChange={formik.handleChange}
            value={formik.values.shippingAddress.fullName}
          />
          <TextField
            fullWidth
            sx={{
              mb: 2,
              border: "#066344 solid 1px",
              borderRadius: "5px",
              outline: "none",
            }}
            label="Address"
            onBlur={formik.handleBlur}
            name="shippingAddress.address"
            id="shippingAddress.address"
            onChange={formik.handleChange}
            value={formik.values.shippingAddress.address}
          />
          <TextField
            fullWidth
            sx={{
              mb: 2,
              border: "#066344 solid 1px",
              borderRadius: "5px",
              outline: "none",
            }}
            label="City"
            onBlur={formik.handleBlur}
            name="shippingAddress.city"
            onChange={formik.handleChange}
            value={formik.values.shippingAddress.city}
          />

          <TextField
            fullWidth
            type="number"
            sx={{
              mb: 2,
              border: "#066344 solid 1px",
              borderRadius: "5px",
              outline: "none",
            }}
            label="Zip Code"
            name="shippingAddress.zipCode"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.shippingAddress.zipCode}
          />

          <Autocomplete
            fullWidth
            sx={{
              mb: 2,
              border: "#066344 solid 1px",
              borderRadius: "5px",
              outline: "none",
            }}
            options={countryList}
            value={formik.values.shippingAddress.country}
            getOptionLabel={(option) => option || ""}
            onChange={(_, value) =>
              formik.setFieldValue("shippingAddress.country", value)
            }
            renderInput={(params) => (
              <TextField
                label="Country"
                variant="outlined"
                placeholder="Select Country"
                // error={!!touched.shipping_country && !!errors.shipping_country}
                // helperText={touched.shipping_country && errors.shipping_country}
                {...params}
              />
            )}
          />
        </Grid>
      </Card1>
      <Typography fontWeight="700" mb={2} sx={{ color: "#066344" }}>
        Billing Address{" "}
        <IconContext.Provider value={{ color: "#B28A3D", size: "1.25rem" }}>
          <MdPayments />
        </IconContext.Provider>
      </Typography>
      <Card1
        sx={{
          mb: 4,
        }}
      >
        <FormControlLabel
          label="Same as shipping address"
          control={<Checkbox size="small" sx={{ color: "#066344" }} />}
          onChange={handleCheckboxChange(formik.values, formik.setFieldValue)}
          sx={{
            zIndex: 1,
            position: "relative",
            mb: sameAsShipping ? "" : "1rem",
          }}
        />
        {!sameAsShipping && (
          <Grid container spacing={3} p={8} sx={{ backgroundColor: "white" }}>
            <TextField
              fullWidth
              sx={{
                mb: 2,
                border: "#066344 solid 1px",
                borderRadius: "5px",
                outline: "none",
              }}
              label="Full Name"
              onBlur={formik.handleBlur}
              name="billingAddress.fullName"
              id="billingAddress.fullName"
              onChange={formik.handleChange}
              value={formik.values.billingAddress.fullName}
            />
            <TextField
              fullWidth
              sx={{
                mb: 2,
                border: "#066344 solid 1px",
                borderRadius: "5px",
                outline: "none",
              }}
              label="Address"
              onBlur={formik.handleBlur}
              name="billingAddress.address"
              id="billingAddress.address"
              onChange={formik.handleChange}
              value={formik.values.billingAddress.address}
            />
            <TextField
              fullWidth
              sx={{
                mb: 2,
                border: "#066344 solid 1px",
                borderRadius: "5px",
                outline: "none",
              }}
              label="City"
              onBlur={formik.handleBlur}
              name="billingAddress.city"
              id="billingAddress.city"
              onChange={formik.handleChange}
              value={formik.values.billingAddress.city}
            />

            <TextField
              fullWidth
              type="number"
              sx={{
                mb: 2,
                border: "#066344 solid 1px",
                borderRadius: "5px",
                outline: "none",
              }}
              label="Zip Code"
              name="billingAddress.zipCode"
              id="billingAddress.zipCode"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.billingAddress.zipCode}
            />

            <Autocomplete
              fullWidth
              sx={{
                mb: 2,
                border: "#066344 solid 1px",
                borderRadius: "5px",
                outline: "none",
              }}
              options={countryList}
              value={formik.values.billingAddress.country}
              getOptionLabel={(option) => option || ""}
              onChange={(_, value) =>
                formik.setFieldValue("billingAddress.country", value)
              }
              renderInput={(params) => (
                <TextField
                  label="Country"
                  variant="outlined"
                  placeholder="Select Country"
                  // error={!!touched.shipping_country && !!errors.shipping_country}
                  // helperText={touched.shipping_country && errors.shipping_country}
                  {...params}
                />
              )}
            />
          </Grid>
        )}
      </Card1>
      <Card1
        sx={{
          mb: 4,
        }}
      >
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Payment Method</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="paymentMethod"
            name="paymentMethod"
            value={formik.values.paymentMethod}
            label="Payment Method"
            onChange={formik.handleChange}
          >
            <MenuItem value="card">Card</MenuItem>
          </Select>
        </FormControl>
      </Card1>
      <Paragraph
        color="red"
        textAlign="center"
        marginBottom="1rem"
        fontSize="16px"
      >
        {isError}
      </Paragraph>
      <Grid container spacing={6}>
        <Grid item sm={6} xs={12}>
          <Link href="/cart" passHref>
            <Button variant="outlined" color="primary" type="button" fullWidth>
              Back to Cart
            </Button>
          </Link>
        </Grid>

        <Grid item sm={6} xs={12}>
          <Button
            type="submit"
            color="info"
            variant="contained"
            sx={{
              backgroundColor: "#066344",
              ":hover": {
                backgroundColor: "grey",
              },
            }}
            fullWidth
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
              "Proceed to Payment"
            )}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};
export default LoginForm;
