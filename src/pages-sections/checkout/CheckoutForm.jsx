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
    setIsLoading(true);
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
          console.log("network error");
        } else {
          console.log(error);
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
      setTimeout(() => {
        submitData(values);
      }, 5000);

      handleCheckout();
      console.log("myValues", values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
      <Typography fontWeight="700" mb={2} sx={{ color: "#066344" }}>
        Shipping Address
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
      <Typography fontWeight="600" mb={2} sx={{ color: "#066344" }}>
        Billing Address
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

// import Link from "next/link";
// import { useState } from "react";
// import { useRouter } from "next/router";
// import Button from "@mui/material/Button";
// import Checkbox from "@mui/material/Checkbox";
// import Grid from "@mui/material/Grid";
// import TextField from "@mui/material/TextField";
// import Typography from "@mui/material/Typography";
// import * as yup from "yup";
// import { Formik } from "formik";
// import Card1 from "components/Card1";
// import Autocomplete from "@mui/material/Autocomplete";
// import countryList from "data/countryList";
// import FormControlLabel from "@mui/material/FormControlLabel";
// const CheckoutForm = () => {
//   const router = useRouter();
//   const [sameAsShipping, setSameAsShipping] = useState(false);
//   const handleFormSubmit = async (values) => {
//     router.push("/payment");
//   };
//   const handleCheckboxChange = (values, setFieldValue) => (e, _) => {
//     const checked = e.currentTarget.checked;
//     setSameAsShipping(checked);
//     setFieldValue("same_as_shipping", checked);
//     setFieldValue("billing_name", checked ? values.shipping_name : "");
//   };
//   return (
//     <Formik
//       initialValues={initialValues}
//       validationSchema={checkoutSchema}
//       onSubmit={handleFormSubmit}
//     >
//       {({
//         values,
//         errors,
//         touched,
//         handleChange,
//         handleBlur,
//         handleSubmit,
//         setFieldValue,
//       }) => (
//         <form onSubmit={handleSubmit}>
//           <Card1
//             sx={{
//               mb: 4,
//             }}
//           >
// <Typography fontWeight="600" mb={2}>
//   Shipping Address
// </Typography>

//             <Grid container spacing={6}>
//               <Grid item sm={6} xs={12}>
// <TextField
//   fullWidth
//   sx={{
//     mb: 2,
//   }}
//   label="Full Name"
//   onBlur={handleBlur}
//   name="shipping_name"
//   onChange={handleChange}
//   value={values.shipping_name}
//   error={!!touched.shipping_name && !!errors.shipping_name}
//   helperText={touched.shipping_name && errors.shipping_name}
// />
//                 <TextField
//                   fullWidth
//                   sx={{
//                     mb: 2,
//                   }}
//                   onBlur={handleBlur}
//                   label="Phone Number"
//                   onChange={handleChange}
//                   name="shipping_contact"
//                   value={values.shipping_contact}
//                   error={
//                     !!touched.shipping_contact && !!errors.shipping_contact
//                   }
//                   helperText={
//                     touched.shipping_contact && errors.shipping_contact
//                   }
//                 />
// <TextField
//   fullWidth
//   type="number"
//   sx={{
//     mb: 2,
//   }}
//   label="Zip Code"
//   name="shipping_zip"
//   onBlur={handleBlur}
//   onChange={handleChange}
//   value={values.shipping_zip}
//   error={!!touched.shipping_zip && !!errors.shipping_zip}
//   helperText={touched.shipping_zip && errors.shipping_zip}
// />
// <TextField
//   fullWidth
//   label="Address 1"
//   onBlur={handleBlur}
//   onChange={handleChange}
//   name="shipping_address1"
//   value={values.shipping_address1}
//   error={
//     !!touched.shipping_address1 && !!errors.shipping_address1
//   }
//   helperText={
//     touched.shipping_address1 && errors.shipping_address1
//   }
// />
//               </Grid>

//               <Grid item sm={6} xs={12}>
//                 <TextField
//                   fullWidth
//                   type="email"
//                   sx={{
//                     mb: 2,
//                   }}
//                   onBlur={handleBlur}
//                   name="shipping_email"
//                   label="Email Address"
//                   onChange={handleChange}
//                   value={values.shipping_email}
//                   error={!!touched.shipping_email && !!errors.shipping_email}
//                   helperText={touched.shipping_email && errors.shipping_email}
//                 />
//                 <TextField
//                   fullWidth
//                   sx={{
//                     mb: 2,
//                   }}
//                   label="Company"
//                   onBlur={handleBlur}
//                   onChange={handleChange}
//                   name="shipping_company"
//                   value={values.shipping_company}
//                   error={
//                     !!touched.shipping_company && !!errors.shipping_company
//                   }
//                   helperText={
//                     touched.shipping_company && errors.shipping_company
//                   }
//                 />

// <Autocomplete
//   fullWidth
//   sx={{
//     mb: 2,
//   }}
//   options={countryList}
//   value={values.shipping_country}
//   getOptionLabel={(option) => option.label}
//   onChange={(_, value) =>
//     setFieldValue("shipping_country", value)
//   }
//   renderInput={(params) => (
//     <TextField
//       label="Country"
//       variant="outlined"
//       placeholder="Select Country"
//       error={
//         !!touched.shipping_country && !!errors.shipping_country
//       }
//       helperText={
//         touched.shipping_country && errors.shipping_country
//       }
//       {...params}
//     />
//   )}
// />

//                 <TextField
//                   fullWidth
//                   label="Address 2"
//                   onBlur={handleBlur}
//                   onChange={handleChange}
//                   name="shipping_address2"
//                   value={values.shipping_address2}
//                   error={
//                     !!touched.shipping_address2 && !!errors.shipping_address2
//                   }
//                   helperText={
//                     touched.shipping_address2 && errors.shipping_address2
//                   }
//                 />
//               </Grid>
//             </Grid>
//           </Card1>

// <Card1
//   sx={{
//     mb: 4,
//   }}
// >
//             <Typography fontWeight="600" mb={2}>
//               Billing Address
//             </Typography>

// <FormControlLabel
//   label="Same as shipping address"
//   control={<Checkbox size="small" color="secondary" />}
//   onChange={handleCheckboxChange(values, setFieldValue)}
//   sx={{
//     zIndex: 1,
//     position: "relative",
//     mb: sameAsShipping ? "" : "1rem",
//   }}
// />

//             {!sameAsShipping && (
//               <Grid container spacing={6}>
//                 <Grid item sm={6} xs={12}>
//                   <TextField
//                     fullWidth
//                     sx={{
//                       mb: 2,
//                     }}
//                     label="Full Name"
//                     name="billing_name"
//                     onBlur={handleBlur}
//                     onChange={handleChange}
//                     value={values.billing_name}
//                     error={!!touched.billing_name && !!errors.billing_name}
//                     helperText={touched.billing_name && errors.billing_name}
//                   />
//                   <TextField
//                     fullWidth
//                     sx={{
//                       mb: 2,
//                     }}
//                     onBlur={handleBlur}
//                     label="Phone Number"
//                     name="billing_contact"
//                     onChange={handleChange}
//                     value={values.billing_contact}
//                     error={
//                       !!touched.billing_contact && !!errors.billing_contact
//                     }
//                     helperText={
//                       touched.billing_contact && errors.billing_contact
//                     }
//                   />
//                   <TextField
//                     fullWidth
//                     type="number"
//                     sx={{
//                       mb: 2,
//                     }}
//                     label="Zip Code"
//                     name="billing_zip"
//                     onBlur={handleBlur}
//                     onChange={handleChange}
//                     value={values.billing_zip}
//                     error={!!touched.billing_zip && !!errors.billing_zip}
//                     helperText={touched.billing_zip && errors.billing_zip}
//                   />
//                   <TextField
//                     fullWidth
//                     label="Address 1"
//                     onBlur={handleBlur}
//                     onChange={handleChange}
//                     name="billing_address1"
//                     value={values.billing_address1}
//                     error={
//                       !!touched.billing_address1 && !!errors.billing_address1
//                     }
//                     helperText={
//                       touched.billing_address1 && errors.billing_address1
//                     }
//                   />
//                 </Grid>

//                 <Grid item sm={6} xs={12}>
//                   <TextField
//                     fullWidth
//                     type="email"
//                     sx={{
//                       mb: 2,
//                     }}
//                     onBlur={handleBlur}
//                     name="billing_email"
//                     label="Email Address"
//                     onChange={handleChange}
//                     value={values.billing_email}
//                     error={!!touched.billing_email && !!errors.billing_email}
//                     helperText={touched.billing_email && errors.billing_email}
//                   />
//                   <TextField
//                     fullWidth
//                     sx={{
//                       mb: 2,
//                     }}
//                     label="Company"
//                     onBlur={handleBlur}
//                     name="billing_company"
//                     onChange={handleChange}
//                     value={values.billing_company}
//                     error={
//                       !!touched.billing_company && !!errors.billing_company
//                     }
//                     helperText={
//                       touched.billing_company && errors.billing_company
//                     }
//                   />
//                   <Autocomplete
//                     fullWidth
//                     sx={{
//                       mb: 2,
//                     }}
//                     options={countryList}
//                     value={values.billing_country}
//                     getOptionLabel={(option) => option.label}
//                     onChange={(_, value) =>
//                       setFieldValue("billing_country", value)
//                     }
//                     renderInput={(params) => (
//                       <TextField
//                         label="Country"
//                         placeholder="Select Country"
//                         error={
//                           !!touched.billing_country && !!errors.billing_country
//                         }
//                         helperText={
//                           touched.billing_country && errors.billing_country
//                         }
//                         {...params}
//                       />
//                     )}
//                   />
//                   <TextField
//                     fullWidth
//                     label="Address 2"
//                     onBlur={handleBlur}
//                     name="billing_address2"
//                     onChange={handleChange}
//                     value={values.billing_address2}
//                     error={
//                       !!touched.billing_address2 && !!errors.billing_address2
//                     }
//                     helperText={
//                       touched.billing_address2 && errors.billing_address2
//                     }
//                   />
//                 </Grid>
//               </Grid>
//             )}
//           </Card1>

// <Grid container spacing={6}>
//   <Grid item sm={6} xs={12}>
//     <Link href="/cart" passHref>
//       <Button
//         variant="outlined"
//         color="primary"
//         type="button"
//         fullWidth
//       >
//         Back to Cart
//       </Button>
//     </Link>
//   </Grid>

//   <Grid item sm={6} xs={12}>
//     <Button
//       variant="contained"
//       color="primary"
//       type="submit"
//       fullWidth
//     >
//       Proceed to Payment
//     </Button>
//   </Grid>
// </Grid>
//         </form>
//       )}
//     </Formik>
//   );
// };
// const initialValues = {
//   shipping_zip: "",
//   shipping_name: "",
//   shipping_email: "",
//   shipping_contact: "",
//   shipping_company: "",
//   shipping_address1: "",
//   shipping_address2: "",
//   shipping_country: countryList[229],
//   billing_zip: "",
//   billing_name: "",
//   billing_email: "",
//   billing_contact: "",
//   billing_company: "",
//   billing_address1: "",
//   billing_address2: "",
//   billing_country: countryList[229],
// };

// // uncomment these fields below for from validation
// const checkoutSchema = yup.object().shape({
//   // shipping_name: yup.string().required("required"),
//   // shipping_email: yup.string().email("invalid email").required("required"),
//   // shipping_contact: yup.string().required("required"),
//   // shipping_zip: yup.string().required("required"),
//   // shipping_country: yup.object().required("required"),
//   // shipping_address1: yup.string().required("required"),
//   // billing_name: yup.string().required("required"),
//   // billing_email: yup.string().required("required"),
//   // billing_contact: yup.string().required("required"),
//   // billing_zip: yup.string().required("required"),
//   // billing_country: yup.object().required("required"),
//   // billing_address1: yup.string().required("required"),
// });
// export default CheckoutForm;
