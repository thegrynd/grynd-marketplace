import React, { useContext } from "react";
import { Grid } from "@mui/material";
import PaymentForm from "pages-sections/payment/PaymentForm";
import PaymentSummary from "pages-sections/payment/PaymentSummary";
import CheckoutNavLayout from "components/layouts/CheckoutNavLayout";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { LoginContext } from "contexts/LoginContext";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(
  `${process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY}`
);

const Checkout = () => {
  const [clientSecret] = useContext(LoginContext);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <CheckoutNavLayout>
      <Grid container flexWrap="wrap-reverse" spacing={3}>
        <Grid item lg={8} md={8} xs={12}>
          {clientSecret && (
            <Elements options={options} stripe={stripePromise}>
              <PaymentForm />
            </Elements>
          )}
        </Grid>

        <Grid item lg={4} md={4} xs={12}>
          <PaymentSummary />
        </Grid>
      </Grid>
    </CheckoutNavLayout>
  );
};
export default Checkout;
