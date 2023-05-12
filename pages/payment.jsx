import React, { useContext, useEffect, useMemo } from "react";
import { Grid } from "@mui/material";
import PaymentForm from "pages-sections/payment/PaymentForm";
import PaymentSummary from "pages-sections/payment/PaymentSummary";
import CheckoutNavLayout from "components/layouts/CheckoutNavLayout";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { LoginContext } from "contexts/LoginContext";
import Cookies from "js-cookie";
import axios from "axios";
import Button from "@mui/material/Button";
import { H1, H3, Paragraph, Span } from "components/Typography";
import { GiShoppingCart } from "react-icons/gi";
import { IconContext } from "react-icons";
import { useRouter } from "next/router";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(
  `${process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY}`
);

const url = process.env.NEXT_PUBLIC_GRYND_URL;
const token = Cookies.get("authToken");

const Checkout = () => {
  const [clientSecret, getAuthUser, setGetAuthUser] = useContext(LoginContext);
  console.log("clientsecret", clientSecret);

  const router = useRouter();

  useEffect(() => {
    // Prefetch the order page
    router.prefetch("/orders/client");
  }, [router]);

  const { data: authUser } = getAuthUser || {};
  console.log("authUser1", authUser);

  const iconContextValue = useMemo(() => {
    return {
      color: "#B28A3D",
      size: "10.25rem",
      textAlign: "center",
    };
  });

  const appearance = {
    theme: "flat",

    variables: {
      colorPrimary: "#066344",
      colorBackground: "#ffffff",
      colorText: "#30313d",
      colorDanger: "red",
      spacingUnit: "7px",
      borderRadius: "5px",
    },
  };

  const options = {
    clientSecret,
    appearance,
  };

  return (
    <CheckoutNavLayout>
      {clientSecret && typeof clientSecret === "string" ? (
        <Grid container flexWrap="wrap-reverse" spacing={3}>
          <Grid item lg={8} md={8} xs={12}>
            <Elements options={options} stripe={stripePromise}>
              <PaymentForm />
            </Elements>
          </Grid>

          <Grid item lg={4} md={4} xs={12}>
            <PaymentSummary />
          </Grid>
        </Grid>
      ) : (
        <>
          {/* <Grid container> */}
          <div style={{ textAlign: "center" }}>
            <Paragraph color="grey.800" fontSize="20px" margin="auto">
              Welcome Back{" "}
              <Span color="#066344" fontWeight="700">
                {" "}
                {authUser?.data.firstname} {authUser?.data.surname}
              </Span>
            </Paragraph>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <IconContext.Provider value={iconContextValue}>
                <GiShoppingCart />
              </IconContext.Provider>
            </div>

            <Button
              type="submit"
              color="info"
              variant="contained"
              sx={{
                backgroundColor: "#B28A3D",
                ":hover": {
                  backgroundColor: "grey",
                },
                margin: "auto",
              }}
              onClick={() => router.push(`/orders/client`)}
            >
              Confirm Last Payment Details
            </Button>
          </div>
          {/* </Grid> */}
        </>
      )}
    </CheckoutNavLayout>
  );
};
export default Checkout;
