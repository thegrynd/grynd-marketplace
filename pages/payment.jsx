import { Grid } from "@mui/material";
import PaymentForm from "pages-sections/payment/PaymentForm";
import PaymentSummary from "pages-sections/payment/PaymentSummary";
import CheckoutNavLayout from "components/layouts/CheckoutNavLayout";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const Checkout = () => {
  const promise = loadStripe(
    "pk_test_51MidNoKdfAkbgNXX4KGIrxHvVVjVVjjlDBSyUNEYxLzwjg8IP4uV1sNDy6noJWDGJMR5Rj3LA0qt56ZRIHQpstTw00amCEEvsq"
  );
  return (
    <CheckoutNavLayout>
      <Grid container flexWrap="wrap-reverse" spacing={3}>
        <Grid item lg={8} md={8} xs={12}>
          <Elements stripe={promise}>
            <PaymentForm />
          </Elements>
        </Grid>

        <Grid item lg={4} md={4} xs={12}>
          <PaymentSummary />
        </Grid>
      </Grid>
    </CheckoutNavLayout>
  );
};
export default Checkout;

// import React from "react";
// import { loadStripe } from "@stripe/stripe-js";
// import { Elements } from "@stripe/react-stripe-js";
// import CheckoutForm from "./CheckoutForm";
// import "./App.css";

// // Make sure to call loadStripe outside of a component’s render to avoid
// // recreating the Stripe object on every render.
// // This is your test publishable API key.
// const promise = loadStripe("pk_test_51MidNoKdfAkbgNXX4KGIrxHvVVjVVjjlDBSyUNEYxLzwjg8IP4uV1sNDy6noJWDGJMR5Rj3LA0qt56ZRIHQpstTw00amCEEvsq");

// export default function App() {
//   return (
//     <div className="App">
//       <Elements stripe={promise}>
//         <CheckoutForm />
//       </Elements>
//     </div>
//   );
// }
