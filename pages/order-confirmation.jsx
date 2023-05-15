import Link from "next/link";
import { Button, Container, styled } from "@mui/material";
import SEO from "components/SEO";
import LazyImage from "components/LazyImage";
import BazaarCard from "components/BazaarCard";
import { H1, H3, Paragraph, Span } from "components/Typography";
import ShopLayout1 from "components/layouts/ShopLayout1";
import axios from "axios";
import useSWR from "swr";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { ThreeCircles } from "react-loader-spinner";

// custom styled components
const Wrapper = styled(BazaarCard)({
  margin: "auto",
  padding: "3rem",
  maxWidth: "630px",
  textAlign: "center",
});
const StyledButton = styled(Button)({
  marginTop: "2rem",
  padding: "11px 24px",
});

const OrderConfirmation = () => {
  const router = useRouter();
  const paymentIntentId = router.query.payment_intent;
  console.log(router.query.payment_intent);

  const token = Cookies.get("authToken");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const address = `${process.env.NEXT_PUBLIC_GRYND_URL}/api/v2/client/orders/confirm-order-payment`;

  const fetcher = async (url) =>
    await axios.post(
      url,
      {
        paymentIntentId: `${paymentIntentId}`,
      },
      config
    );
  const { data, error } = useSWR(address, fetcher);

  const { data: paymentData } = data?.data || {};
  // console.log("paymentData", paymentData);
  // console.log("main error", error);

  return (
    <ShopLayout1>
      <SEO title="Order Confirmation" />

      <Container
        sx={{
          mt: 4,
          mb: 20,
        }}
      >
        <Wrapper>
          <LazyImage
            width={116}
            height={116}
            alt="complete"
            src="/assets/images/illustrations/party-popper.svg"
          />
          <H1 lineHeight={1.1} mt="1.5rem" color="#066344">
            Congratulations! <br />
          </H1>
          <H3 color="#066344">
            {" "}
            Here is your{" "}
            <Span color="red">
              <Link
                href={`/client/orders/${paymentData?._id}`}
                style={{ cursor: "pointer", color: "red" }}
              >
                {data === undefined ? (
                  <ThreeCircles
                    height="20"
                    width="20"
                    color="#B28A3D"
                    wrapperStyle={{
                      display: "inline",
                    }}
                    wrapperClass=""
                    visible={true}
                    ariaLabel="three-circles-rotating"
                    outerCircleColor=""
                    innerCircleColor=""
                    middleCircleColor=""
                  />
                ) : (
                  "Order Details"
                )}
              </Link>
            </Span>
          </H3>

          <Paragraph color="grey.800" mt="0.3rem">
            You will receive a confirmation email.
          </Paragraph>

          <Link href="/" passHref>
            <StyledButton
              color="primary"
              sx={{
                backgroundColor: "#066344",
                "&:hover": {
                  backgroundColor: "#808080",
                },
              }}
              disableElevation
              variant="contained"
              className="button-link"
            >
              Continue Shopping
            </StyledButton>
          </Link>
        </Wrapper>
      </Container>
    </ShopLayout1>
  );
};

export default OrderConfirmation;
