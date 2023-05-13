import { Fragment } from "react";
import { useRouter } from "next/router";
import { format } from "date-fns";
import { Done, ShoppingBag } from "@mui/icons-material";
import { GiShoppingBag } from "react-icons/gi";
import { IoCube } from "react-icons/io5";
import { FaShuttleVan } from "react-icons/fa";
import { AiFillCarryOut } from "react-icons/ai";
import { BsFillPatchCheckFill } from "react-icons/bs";
import {
  Avatar,
  Box,
  Button,
  Card,
  Divider,
  Grid,
  Typography,
  styled,
} from "@mui/material";
import TableRow from "components/TableRow";
import { H5, H6, Paragraph } from "components/Typography";
import { FlexBetween, FlexBox } from "components/flex-box";
import UserDashboardHeader from "components/header/UserDashboardHeader";
import CustomerDashboardLayout from "components/layouts/customer-dashboard";
import CustomerDashboardNavigation from "components/layouts/customer-dashboard/Navigations";
import useWindowSize from "hooks/useWindowSize";
import { currency } from "lib";
import useSWR from "swr";
import axios from "axios";
import Cookies from "js-cookie";
import { H3, H4, Span } from "../../../src/components/Typography";

// styled components
const StyledFlexbox = styled(FlexBetween)(({ theme }) => ({
  flexWrap: "wrap",
  marginTop: "2rem",
  marginBottom: "2rem",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
  },
  "& .line": {
    height: 4,
    minWidth: 50,
    flex: "1 1 0",
    [theme.breakpoints.down("sm")]: {
      flex: "unset",
      height: 50,
      minWidth: 4,
    },
  },
}));
// =============================================================

const OrderDetails = ({ order }) => {
  const router = useRouter();
  const width = useWindowSize();
  const orderStatus = "Shipping";
  const orderStatusList = ["Packaging", "Shipping", "Delivering", "Complete"];
  const stepIconList = [
    { IconPackage: IoCube, IconDesc: "Order Made", red: true },
    { IconPackage: FaShuttleVan, IconDesc: "Order Processing", yellow: true },
    { IconPackage: AiFillCarryOut, IconDesc: "Order Delivered", green: true },
  ];
  const breakpoint = 350;
  const statusIndex = orderStatusList.indexOf(orderStatus);

  const token = Cookies.get("authToken");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const address = `${process.env.NEXT_PUBLIC_GRYND_URL}/api/v2/client/orders/${router.query.id}`;

  const fetcher = async (url) => await axios.get(url, config);
  const { data, error } = useSWR(address, fetcher);

  const { data: singleOrderData } = data?.data || {};
  console.log("singleOrderData", singleOrderData);

  // SECTION TITLE HEADER
  const HEADER_BUTTON = (
    <Button
      color="primary"
      sx={{
        bgcolor: "#066344",
        color: "#FFFFFF",
        px: 4,
        ":hover": {
          color: "#000000",
          bgcolor: "gray",
        },
      }}
    >
      Order Again
    </Button>
  );

  // Show a loading state when the fallback is rendered
  if (router.isFallback) {
    return <h1>Loading...</h1>;
  }
  return (
    <CustomerDashboardLayout>
      {/* TITLE HEADER AREA */}
      <UserDashboardHeader
        icon={GiShoppingBag}
        title="Your Order Details"
        navigation={<CustomerDashboardNavigation />}
        button={HEADER_BUTTON}
      />

      {/* ORDER PROGRESS AREA */}
      <Card
        sx={{
          p: "2rem 1.5rem",
          mb: "30px",
        }}
      >
        <StyledFlexbox>
          {stepIconList.map((Icon, ind) => (
            <Fragment key={ind}>
              <Box position="relative">
                <Avatar
                  sx={{
                    width: 64,
                    height: 64,
                    bgcolor: ind <= statusIndex ? "#B28A3D" : "grey.300",
                    color: ind <= statusIndex ? "grey.white" : "primary.main",
                  }}
                >
                  <Icon.IconPackage
                    color={
                      Icon.red
                        ? "#850101"
                        : Icon.yellow
                        ? "#ffff80"
                        : Icon.green
                        ? "green"
                        : "red"
                    }
                    fontSize="2rem"
                  />
                </Avatar>
                <H6 my="1rem" color="#CC5500" textAlign="center">
                  {Icon.IconDesc}
                </H6>

                {ind < statusIndex && (
                  <Box position="absolute" right="0" top="0">
                    <Avatar
                      sx={{
                        width: 22,
                        height: 22,
                        bgcolor: "grey.200",
                        color: "success.main",
                      }}
                    >
                      <BsFillPatchCheckFill color="inherit" fontSize="2rem" />
                    </Avatar>
                  </Box>
                )}
              </Box>

              {ind < stepIconList.length - 1 && (
                <Box
                  className="line"
                  bgcolor={ind < statusIndex ? "#066344" : "grey.300"}
                />
              )}
            </Fragment>
          ))}
        </StyledFlexbox>

        <FlexBox justifyContent={width < breakpoint ? "center" : "flex-end"}>
          <Typography
            p="0.5rem 1rem"
            textAlign="center"
            borderRadius="300px"
            color="#066344"
            bgcolor="#d0b88a"
          >
            Estimated Delivery Date{" "}
            <b>
              {format(
                new Date(singleOrderData?.estimatedDeliveryDate ?? null),
                "dd MMM, yyyy"
              )}
            </b>
          </Typography>
        </FlexBox>
      </Card>

      {/* ORDERED PRODUCT LIST */}
      <Card
        sx={{
          p: 0,
          mb: "30px",
        }}
      >
        <TableRow
          sx={{
            p: "12px",
            borderRadius: 0,
            boxShadow: "none",
            bgcolor: "grey.200",
          }}
        >
          <FlexBox className="pre" m={0.75} alignItems="center">
            <Typography fontSize={14} color="grey.600" mr={0.5}>
              Order ID:
            </Typography>

            <Typography fontSize={14}>{singleOrderData?.id}</Typography>
          </FlexBox>

          <FlexBox className="pre" m={0.75} alignItems="center">
            <Typography fontSize={14} color="grey.600" mr={0.5}>
              Ordered on:
            </Typography>

            <Typography fontSize={14}>
              {format(
                new Date(singleOrderData?.createdAt ?? null),
                "dd MMM, yyyy"
              )}
            </Typography>
          </FlexBox>

          <FlexBox className="pre" m={0.75} alignItems="center">
            <Typography fontSize={14} color="grey.600" mr={0.5}>
              Order Status:
            </Typography>

            <Typography
              fontSize={14}
              p="0.3rem 0.5rem"
              borderRadius="5px"
              color={
                singleOrderData?.orderStatus === "processing"
                  ? "#066344"
                  : "#ffffff"
              }
              bgcolor={
                singleOrderData?.orderStatus === "processing"
                  ? "#d0b88a"
                  : "#066344"
              }
              sx={{
                textTransform: "capitalize",
              }}
            >
              {singleOrderData?.orderStatus}
            </Typography>
          </FlexBox>
        </TableRow>

        <Box py={1}>
          {singleOrderData?.orderItems.map((item, ind) => (
            <FlexBox
              px={2}
              py={1}
              flexWrap="wrap"
              alignItems="center"
              key={item.id}
            >
              <FlexBox flex="2 2 260px" m={0.75} alignItems="center">
                <Avatar
                  src={item.product.images[0]?.url}
                  sx={{
                    height: 64,
                    width: 64,
                  }}
                />
                <Box ml={2.5}>
                  <H6 my="0px" color="#066344">
                    {item.product.name}
                  </H6>

                  <Typography fontSize="14px" color="grey.600">
                    {currency(item.price)} x {item.quantity}
                  </Typography>
                </Box>
              </FlexBox>

              <FlexBox flex="1 1 260px" m={0.75} alignItems="center">
                <Typography fontSize="14px" color="grey.600">
                  Description
                </Typography>
              </FlexBox>

              <FlexBox flex="160px" m={0.75} alignItems="center">
                <Button
                  variant="text"
                  color="primary"
                  sx={{ color: "#CC5500" }}
                >
                  <Typography fontSize="14px">Write a Review</Typography>
                </Button>
              </FlexBox>
            </FlexBox>
          ))}
        </Box>
      </Card>

      {/* SHIPPING AND ORDER SUMMERY */}
      <Grid container spacing={3}>
        <Grid item lg={6} md={6} xs={12}>
          <Card
            sx={{
              p: "20px 30px",
            }}
          >
            <H4 mt={0} mb={2} color="#066344">
              Shipping Address
            </H4>

            <FlexBetween mb={1}>
              <Typography fontSize={14} color="grey.600">
                {" "}
                Address: {""}
              </Typography>
              <H6 my="0px" color="#B28A3D">
                {singleOrderData?.shippingAddress.address}
              </H6>
            </FlexBetween>
            <FlexBetween mb={1}>
              <Typography fontSize={14} color="grey.600">
                {" "}
                City: {""}
              </Typography>
              <H6 my="0px" color="#B28A3D">
                {singleOrderData?.shippingAddress.city}
              </H6>
            </FlexBetween>
            <FlexBetween mb={1}>
              <Typography fontSize={14} color="grey.600">
                {" "}
                Country: {""}
              </Typography>
              <H6 my="0px" color="#B28A3D">
                {singleOrderData?.shippingAddress.country}
              </H6>
            </FlexBetween>
            <FlexBetween mb={1}>
              <Typography fontSize={14} color="grey.600">
                {" "}
                Zip Code: {""}
              </Typography>
              <H6 my="0px" color="#B28A3D">
                {singleOrderData?.shippingAddress.zipCode}
              </H6>
            </FlexBetween>
          </Card>
        </Grid>

        <Grid item lg={6} md={6} xs={12}>
          <Card
            sx={{
              p: "20px 30px",
            }}
          >
            <H4 mt={0} mb={2} color="#066344">
              Total Summary
            </H4>

            <FlexBetween mb={1}>
              <Typography fontSize={14} color="grey.600">
                Subtotal:
              </Typography>

              <H6 my="0px">
                {/* {currency(order.totalPrice)} */}
                {singleOrderData?.totalPrice}
              </H6>
            </FlexBetween>

            <FlexBetween mb={1}>
              <Typography fontSize={14} color="grey.600">
                Shipping fee:
              </Typography>

              <H6 my="0px">
                <em>{currency(singleOrderData?.shippingPrice)}</em>
              </H6>
            </FlexBetween>

            <FlexBetween mb={1}>
              <Typography fontSize={14} color="grey.600">
                Discount:
              </Typography>

              <H6 my="0px">
                <em> {currency(singleOrderData?.discount)}</em>
              </H6>
            </FlexBetween>

            <Divider
              sx={{
                mb: 1,
              }}
            />

            <FlexBetween mb={2}>
              <H3 my="0px" color="#066344">
                Total:
              </H3>
              <H3 my="0px" color="#066344">
                {" "}
                <em> {currency(singleOrderData?.totalPrice)}</em>
              </H3>
            </FlexBetween>

            <Typography fontSize={14}>Paid by Credit/Debit Card</Typography>
          </Card>
        </Grid>
      </Grid>
    </CustomerDashboardLayout>
  );
};
// export const getStaticPaths = async () => {
//   const paths = await api.getIds();
//   return {
//     paths: paths,
//     //indicates that no page needs be created at build time
//     fallback: "blocking" //indicates the type of fallback
//   };
// };

// export const getStaticProps = async ({
//   params
// }) => {
//   const order = await api.getOrder(String(params.id));
//   return {
//     props: {
//       order
//     }
//   };
// };
export default OrderDetails;
