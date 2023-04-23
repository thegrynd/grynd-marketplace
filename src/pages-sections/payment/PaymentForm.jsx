import React, { useContext } from "react";
import {
  PaymentElement,
  LinkAuthenticationElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { LoginContext } from "contexts/LoginContext";
import { Paragraph } from "components/Typography";
import { Button } from "@mui/material";

export default function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();

  const [email, setEmail] = React.useState("");
  const [message, setMessage] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [clientSecret] = useContext(LoginContext);

  React.useEffect(() => {
    if (!stripe) {
      return;
    }

    // const clientSecret = new URLSearchParams(window.location.search).get(
    //   "payment_intent_client_secret"
    // );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Please input your card details and make payment");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: "http://localhost:3001/order-confirmation",
        // "https://grynd-marketplace-staging-ten.vercel.app/order-confirmation"
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs",
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <LinkAuthenticationElement
        id="link-authentication-element"
        onChange={(e) => setEmail(e.target.value)}
      />
      <PaymentElement id="payment-element" options={paymentElementOptions} />
      <Button
        variant="outline"
        sx={{
          mt: "1rem",
          backgroundColor: "#066344",
          color: "#fff",
          ":hover": {
            backgroundColor: "grey",
          },
        }}
        disabled={isLoading || !stripe || !elements}
        id="submit"
      >
        <span>
          {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
        </span>
      </Button>
      {/* Show any error or success messages */}
      {/* {message && <div id="payment-message">{message}</div>} */}
      <Paragraph
        color="red"
        textAlign="center"
        marginBottom="1rem"
        fontSize="16px"
      >
        {message}
      </Paragraph>
    </form>
  );
}

// import Link from "next/link";
// import { useRouter } from "next/router";
// import { Fragment, useState } from "react";
// import { Box, Button, Divider, Grid, Radio, TextField } from "@mui/material";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import * as yup from "yup";
// import { Formik } from "formik";
// import Card1 from "components/Card1";
// import { FlexBox } from "components/flex-box";
// import { Paragraph } from "components/Typography";
// import useWindowSize from "hooks/useWindowSize";
// const PaymentForm = () => {
//   const [paymentMethod, setPaymentMethod] = useState("credit-card");
//   const width = useWindowSize();
//   const router = useRouter();
//   const isMobile = width < 769;
//   const handleFormSubmit = async values => router.push("/payment");
//   const handlePaymentMethodChange = ({
//     target: {
//       name
//     }
//   }) => {
//     setPaymentMethod(name);
//   };
//   return <Fragment>
//       <Card1 sx={{
//       mb: 4
//     }}>
//         <FormControlLabel sx={{
//         mb: 3
//       }} name="credit-card" onChange={handlePaymentMethodChange} label={<Paragraph fontWeight={600}>Pay with credit card</Paragraph>} control={<Radio checked={paymentMethod === "credit-card"} color="primary" size="small" />} />

//         <Divider sx={{
//         mb: 3,
//         mx: -4
//       }} />

//         {paymentMethod === "credit-card" && <Formik onSubmit={handleFormSubmit} initialValues={initialValues} validationSchema={checkoutSchema}>
//             {({
//           values,
//           errors,
//           touched,
//           handleChange,
//           handleBlur,
//           handleSubmit
//         }) => <form onSubmit={handleSubmit}>
//                 <Box mb={3}>
//                   <Grid container spacing={3}>
//                     <Grid item sm={6} xs={12}>
//                       <TextField fullWidth name="card_no" label="Card Number" onBlur={handleBlur} value={values.card_no} onChange={handleChange} helperText={touched.card_no && errors.card_no} />
//                     </Grid>
//                     <Grid item sm={6} xs={12}>
//                       <TextField fullWidth name="exp_date" label="Exp Date" placeholder="MM/YY" onBlur={handleBlur} onChange={handleChange} value={values.exp_date} helperText={touched.exp_date && errors.exp_date} />
//                     </Grid>
//                     <Grid item sm={6} xs={12}>
//                       <TextField fullWidth name="name" onBlur={handleBlur} value={values.name} label="Name on Card" onChange={handleChange} helperText={touched.name && errors.name} />
//                     </Grid>
//                     <Grid item sm={6} xs={12}>
//                       <TextField fullWidth name="name" onBlur={handleBlur} value={values.name} label="Name on Card" onChange={handleChange} helperText={touched.name && errors.name} />
//                     </Grid>
//                   </Grid>
//                 </Box>

//                 <Button variant="outlined" color="primary" sx={{
//             mb: 4
//           }}>
//                   Submit
//                 </Button>

//                 <Divider sx={{
//             mb: 3,
//             mx: -4
//           }} />
//               </form>}
//           </Formik>}

//         <FormControlLabel name="paypal" sx={{
//         mb: 3
//       }} onChange={handlePaymentMethodChange} label={<Paragraph fontWeight={600}>Pay with Paypal</Paragraph>} control={<Radio checked={paymentMethod === "paypal"} color="primary" size="small" />} />

//         <Divider sx={{
//         mb: 3,
//         mx: -4
//       }} />

//         {paymentMethod === "paypal" && <Fragment>
//             <FlexBox alignItems="flex-end" mb={4}>
//               <TextField fullWidth name="email" type="email" label="Paypal Email" sx={{
//             mr: isMobile ? "1rem" : "30px"
//           }} />
//               <Button variant="outlined" color="primary" type="button">
//                 Submit
//               </Button>
//             </FlexBox>

//             <Divider sx={{
//           mb: 3,
//           mx: -4
//         }} />
//           </Fragment>}

//         <FormControlLabel name="cod" onChange={handlePaymentMethodChange} label={<Paragraph fontWeight={600}>Cash On Delivery</Paragraph>} control={<Radio checked={paymentMethod === "cod"} color="primary" size="small" />} />
//       </Card1>

//       <Grid container spacing={7}>
//         <Grid item sm={6} xs={12}>
//           <Link href="/checkout" passHref>
//             <Button variant="outlined" color="primary" type="button" fullWidth>
//               Back to checkout details
//             </Button>
//           </Link>
//         </Grid>

//         <Grid item sm={6} xs={12}>
//           <Link href="/orders" passHref>
//             <Button variant="contained" color="primary" type="submit" fullWidth>
//               Review
//             </Button>
//           </Link>
//         </Grid>
//       </Grid>
//     </Fragment>;
// };
// const initialValues = {
//   card_no: "",
//   name: "",
//   exp_date: "",
//   cvc: "",
//   shipping_zip: "",
//   shipping_country: "",
//   shipping_address1: "",
//   shipping_address2: "",
//   billing_name: "",
//   billing_email: "",
//   billing_contact: "",
//   billing_company: "",
//   billing_zip: "",
//   billing_country: "",
//   billing_address1: "",
//   billing_address2: ""
// };
// const checkoutSchema = yup.object().shape({
//   card_no: yup.string().required("required"),
//   name: yup.string().required("required"),
//   exp_date: yup.string().required("required"),
//   cvc: yup.string().required("required")
//   // shipping_zip: yup.string().required("required"),
//   // shipping_country: yup.object().required("required"),
//   // shipping_address1: yup.string().required("required"),
//   // billing_name: yup.string().required("required"),
//   // billing_email: yup.string().required("required"),
//   // billing_contact: yup.string().required("required"),
//   // billing_zip: yup.string().required("required"),
//   // billing_country: yup.string().required("required"),
//   // billing_address1: yup.string().required("required"),
// });

// export default PaymentForm;
