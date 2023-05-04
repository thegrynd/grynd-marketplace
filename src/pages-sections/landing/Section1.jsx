import React, { useContext } from "react";
import { Box, Button, styled, TextField } from "@mui/material";
import { H1, H5 } from "components/Typography";
import { SearchOutlinedIcon } from "components/search-box/styled";
import { LoginContext } from "contexts/LoginContext";
import Link from "next/link";
const leftImg = "/assets/images/landing/yam.png";
const midImg = "/assets/images/landing/habanero.png";
const rightImg = "/assets/images/landing/greenchilli.png";
import { Grid } from "@mui/material";
import { ThreeCircles } from "react-loader-spinner";

// styled component
const Container = styled(Box)(({ theme }) => ({
  width: "100%",
  height: 650,
  padding: 20,
  paddingTop: 160,
  backgroundColor: theme.palette.grey[100],
  backgroundSize: "40%, 40%",
  backgroundPosition: "left bottom, right bottom",
  backgroundRepeat: "no-repeat, no-repeat",
  transition: "all .3s",
  backgroundImage:
    theme.direction === "ltr"
      ? `url('${leftImg}'), url('${rightImg}'), url('${rightImg}'), url('${midImg}'), url('${leftImg}')`
      : `url('${rightImg}'), url('${leftImg}')`,
  "& h1": {
    fontSize: 42,
    textAlign: "center",
    marginBottom: 40,
    lineHeight: 1.3,
  },
  "& .searchBox": {
    margin: "auto",
    maxWidth: "600px",
    borderRadius: "8px",
    overflow: "hidden",
    boxShadow: theme.shadows[2],
  },
  [theme.breakpoints.up("md")]: {
    backgroundSize: "450px, 450px",
  },
  [theme.breakpoints.down("md")]: {
    height: 550,
    paddingTop: 130,
    "& h1": {
      fontSize: 38,
      textAlign: "center",
    },
  },
  [theme.breakpoints.down("sm")]: {
    height: 480,
    paddingTop: 100,
    "& h1": {
      fontSize: 30,
    },
    "& .searchBox": {
      margin: 0,
    },
  },
}));
const Section1 = () => {
  const [getAuthUser, setGetAuthUser, loadUser] = useContext(LoginContext);
  const { data: authUser } = getAuthUser || {};
  // console.log("checking", getAuthUser);
  const SEARCH_BUTTON = (
    <Button
      color="primary"
      disableElevation
      variant="contained"
      sx={{
        px: "2rem",
        height: "100%",
        borderRadius: "0 8px 8px 0",
        background: "green",
      }}
    >
      Search
    </Button>
  );
  return (
    <Container>
      <Grid container>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <H1 maxWidth={600} mx="auto" color="#066344">
            The Best Online Agro Store
          </H1>
          <H5 color="grey" textAlign="center">
            Buy products and deliver to your doorstep. Sell products to online
            buyers
          </H5>
        </Grid>
      </Grid>

      {authUser?.data.isSeller === false && authUser?.data.role !== "admin" ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: "1rem" }}>
          <Link href={"/vendor/create-seller"}>
            <Button
              sx={{
                borderRadius: "4px",
                background: "green",
                color: "white",
                padding: "0.5rem 1rem",
                ":hover": {
                  backgroundColor: "grey",
                  color: "black",
                },
              }}
            >
              Become a Seller
            </Button>
          </Link>
        </Box>
      ) : authUser === undefined && loadUser === true ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: "1rem" }}>
          <Button
            sx={{
              borderRadius: "4px",
              background: "green",
              color: "white",
              padding: "0.5rem 1rem",
              ":hover": {
                backgroundColor: "grey",
                color: "black",
              },
            }}
          >
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
          </Button>
        </Box>
      ) : null}
    </Container>
  );
};
export default Section1;
