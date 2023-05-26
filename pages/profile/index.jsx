import Link from "next/link";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import TableRow from "components/TableRow";
import { H3, Small } from "../../src/components/Typography";
import { FlexBetween, FlexBox } from "components/flex-box";
import UserDashboardHeader from "components/header/UserDashboardHeader";
import CustomerDashboardLayout from "components/layouts/customer-dashboard";
import CustomerDashboardNavigation from "components/layouts/customer-dashboard/Navigations";
import { currency } from "lib";
import useSWR from "swr";
import axios from "axios";
import Cookies from "js-cookie";
import Image from "next/image";
import { parseCookies } from "../../helpers/validation";

// ============================================================

const Profile = () => {
  const downMd = useMediaQuery((theme) => theme.breakpoints.down("md"));

  const token = Cookies.get("authToken");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const address = `${process.env.NEXT_PUBLIC_GRYND_URL}/api/v1/auth/me`;

  const fetcher = async (url) => await axios.get(url, config);
  const { data, error } = useSWR(address, fetcher);

  const { data: userData } = data?.data || {};
  console.log("userData", userData);

  // SECTION TITLE HEADER LINK
  const HEADER_LINK = (
    <Link href={`/profile/${userData?.id ?? null}`} passHref>
      <Button
        color="primary"
        sx={{
          px: 4,
          bgcolor: "#066344",
          color: "#ffffff",
          ":hover": {
            color: "#000000",
          },
        }}
      >
        Edit Profile
      </Button>
    </Link>
  );
  const infoList = [
    {
      title: "16",
      subtitle: "All Orders",
    },
    {
      title: "02",
      subtitle: "Awaiting Payments",
    },
    {
      title: "00",
      subtitle: "Awaiting Shipment",
    },
    {
      title: "01",
      subtitle: "Awaiting Delivery",
    },
  ];
  return (
    <CustomerDashboardLayout>
      {/* TITLE HEADER AREA */}
      <UserDashboardHeader
        // icon={Person}
        title={
          userData?.role === "admin" && userData?.isSeller === false
            ? "Admin"
            : userData?.isSeller === true
            ? "Seller"
            : userData?.isSeller === false
            ? "User"
            : null
        }
        button={HEADER_LINK}
        navigation={<CustomerDashboardNavigation />}
      />

      {/* USER PROFILE INFO */}
      <Box mb={4}>
        <Grid container spacing={3}>
          <Grid item md={6} xs={12}>
            <Card
              sx={{
                display: "flex",
                flexDirection: "column",
                p: "14px 32px",
                height: "100%",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <div>
                  <Image
                    width={400}
                    height={100}
                    objectFit="cover"
                    src="/gryndlogo.png"
                    alt="user cover image"
                  />
                </div>
                <div>
                  <Avatar
                    // src={authUser ? authUser?.data.}
                    sx={{
                      height: 64,
                      width: 64,
                      mx: "auto",
                    }}
                  />
                </div>
              </div>
              <Box ml={1.5} flex="1 1 0">
                <FlexBetween flexWrap="wrap" flexDirection="column">
                  <div>
                    <H3 my="0px" color="primary.main">{`${
                      userData ? userData?.firstname : ""
                    } ${userData ? userData?.surname : ""}`}</H3>
                    <FlexBox alignItems="center">
                      <Typography color="black.900">Balance:</Typography>
                      <Typography ml={0.5} color="primary.main">
                        {currency(500)}
                      </Typography>
                    </FlexBox>
                  </div>
                  <FlexBox alignItems="flex-start" justifyContent="flex-start">
                    <Typography color="black.900">Country: </Typography>
                    <FlexBox alignItems="center">
                      <Typography color="grey.600" ml={0.5}>
                        {" "}
                        {userData ? userData?.country : ""}
                      </Typography>
                    </FlexBox>
                  </FlexBox>
                </FlexBetween>
              </Box>
            </Card>
          </Grid>

          <Grid item md={6} xs={12}>
            <H3 mb="0.5rem" color="green">
              Orders & Payments
            </H3>
            <Grid container spacing={4}>
              {infoList.map((item) => (
                <Grid item lg={3} sm={6} xs={6} key={item.subtitle}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      p: "1rem 1.25rem",
                      alignItems: "center",
                      flexDirection: "column",
                    }}
                  >
                    <H3 color="primary.main" my={0} fontWeight={600}>
                      {item.title}
                    </H3>

                    <Small color="grey.600" textAlign="center">
                      {item.subtitle}
                    </Small>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Box>

      <H3 mb="0.5rem" color="green">
        Personal Details
      </H3>
      <TableRow
        sx={{
          cursor: "auto",
          p: "0.75rem 1.5rem",
          ...(downMd && {
            alignItems: "start",
            flexDirection: "column",
            justifyContent: "flex-start",
          }),
        }}
      >
        <TableRowItem
          title="First Name"
          value={userData ? userData?.firstname : ""}
        />
        <TableRowItem
          title="Last Name"
          value={userData ? userData.surname : ""}
        />
        <TableRowItem
          title="Username"
          value={userData ? userData.username : ""}
        />
        <TableRowItem title="Email" value={userData ? userData.email : ""} />
        <TableRowItem title="Phone" value={userData ? userData.phone : ""} />
        <TableRowItem
          title="Country"
          value={userData ? userData.country : ""}
        />
      </TableRow>
    </CustomerDashboardLayout>
  );
  xs;
};
const TableRowItem = ({ title, value }) => {
  return (
    <FlexBox flexDirection="column" p={1}>
      <Small color="#066344" fontWeight={700} mb={0.5} textAlign="left">
        {title}
      </Small>
      <span>{value}</span>
    </FlexBox>
  );
};

export default Profile;
