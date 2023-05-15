import { Fragment } from "react";
import { useRouter } from "next/router";
import { format } from "date-fns";
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

const OrderDetails = () => {
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

  const address = `${process.env.NEXT_PUBLIC_GRYND_URL}/api/v2/orders/products/${router.query.id}`;

  const fetcher = async (url) => await axios.get(url, config);
  const { data, error } = useSWR(address, fetcher);

  const { data: singleOrderData } = data?.data || {};
  console.log("singleOrderData", singleOrderData);

  // SECTION TITLE HEADER
  const HEADER_BUTTON = (
    <Button
      color="primary"
      onClick={() => router.push(`/vendor/orders`)}
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
      View All Orders
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
              Buyer Details
            </H4>

            <FlexBetween mb={1}>
              <Typography fontSize={14} color="grey.600">
                {" "}
                Quantity: {""}
              </Typography>
              <H6 my="0px" color="#B28A3D">
                {currency(singleOrderData?.price) ?? "Loading..."} x{" "}
                {singleOrderData?.quantity}
              </H6>
            </FlexBetween>
            <FlexBetween mb={1}>
              <Typography fontSize={14} color="grey.600">
                {" "}
                Buyer Name: {""}
              </Typography>
              <H6 my="0px" color="#B28A3D">
                {singleOrderData?.user.fullname ?? "Loading..."}
              </H6>
            </FlexBetween>
            <FlexBetween mb={1}>
              <Typography fontSize={14} color="grey.600">
                {" "}
                Buyer Contact: {""}
              </Typography>
              <H6 my="0px" color="#B28A3D">
                +{singleOrderData?.user.phone ?? "Loading..."}
              </H6>
            </FlexBetween>
            <FlexBetween mb={1}>
              <Typography fontSize={14} color="grey.600">
                {" "}
                Buyer Country: {""}
              </Typography>
              <H6 my="0px" color="#B28A3D">
                {singleOrderData?.user.country ?? "Loading..."}
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
              Order Details
            </H4>
            <Divider
              sx={{
                mb: 1,
              }}
            />
            <FlexBetween mb={1}>
              <Typography fontSize={14} color="grey.600">
                {" "}
                Item(s): {""}
              </Typography>
              <H6 my="0px" color="#B28A3D">
                {singleOrderData?.product.name ?? "Loading..."}
              </H6>
            </FlexBetween>
            <FlexBetween mb={1}>
              <Typography fontSize={14} color="grey.600">
                {" "}
                Order Total Price: {""}
              </Typography>
              <H6 my="0px" color="#B28A3D">
                {currency(singleOrderData?.order.totalPrice ?? "Loading...")}
              </H6>
            </FlexBetween>
            <FlexBetween mb={1}>
              <Typography fontSize={14} color="grey.600">
                {" "}
                Count in Stock: {""}
              </Typography>
              <H6 my="0px" color="#B28A3D">
                {singleOrderData?.product.countInStock ?? "Loading..."}
              </H6>
            </FlexBetween>
            <FlexBetween mb={1}>
              <Typography fontSize={14} color="grey.600">
                {" "}
                Rating: {""}
              </Typography>
              <H6 my="0px" color="#B28A3D">
                {singleOrderData?.product.rating ?? "Loading..."}
              </H6>
            </FlexBetween>

            <FlexBetween mb={2}>
              <H3 my="0px" color="#066344">
                Price:
              </H3>
              <H3 my="0px" color="#066344">
                {" "}
                <em> {currency(singleOrderData?.totalPrice)}</em>
              </H3>
            </FlexBetween>
          </Card>
        </Grid>
      </Grid>
    </CustomerDashboardLayout>
  );
};

export default OrderDetails;
