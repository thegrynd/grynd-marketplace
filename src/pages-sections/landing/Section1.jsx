import { Box, Button, Container } from "@mui/material";
import { Link as Scroll } from "react-scroll";
import DoneIcon from "@mui/icons-material/Done";
import LazyImage from "components/LazyImage";
import { FlexBox, FlexRowCenter } from "components/flex-box";
import { H1, Paragraph, Span } from "components/Typography";
import Header from "./Header";
import Tooltip from "@mui/material/Tooltip";
import HelpIcon from "@mui/icons-material/Help";
import { IconContext } from "react-icons";
import {
  BsFillLightningChargeFill,
  BsFillHandThumbsUpFill,
} from "react-icons/bs";
import { MdPayment } from "react-icons/md";
import Link from "next/link";

const Section1 = () => {
  return (
    <Box>
      <Header />

      <Container
        id="section-1"
        sx={{
          mt: 12,
          position: "relative",
        }}
      >
        <Box maxWidth="830px" mx="auto" mb={12} textAlign="center">
          <H1 fontSize="40px" mb={3} fontWeight="900">
            <Span color="#066344">Your Number One Agro E-commerce Store</Span>
            {/* <Box color="primary.main" lineHeight={1.2}>
              Bazaar
            </Box> */}
          </H1>

          <Paragraph
            fontSize="18px"
            fontWeight={500}
            maxWidth="540px"
            mx="auto"
            mb={3}
          >
            Buy, sell, advertise different agro products in a seamless way
          </Paragraph>

          <FlexRowCenter
            sx={{
              mb: 5,
              flexDirection: {
                md: "row",
                xs: "column",
              },
            }}
          >
            <FlexBox
              my={1}
              mr={2}
              alignItems="center"
              fontWeight={500}
              color="grey.900"
            >
              <IconContext.Provider
                value={{ color: "#DC143C", className: "global-class-name" }}
              >
                <BsFillLightningChargeFill />
              </IconContext.Provider>{" "}
              &nbsp; Fast Delivery/Sales
            </FlexBox>

            <FlexBox
              my={1}
              mr={2}
              alignItems="center"
              fontWeight={500}
              color="grey.900"
            >
              <IconContext.Provider
                value={{ color: "green", className: "global-class-name" }}
              >
                <BsFillHandThumbsUpFill />
              </IconContext.Provider>{" "}
              &nbsp; Quality Products
            </FlexBox>

            <FlexBox
              my={1}
              alignItems="center"
              fontWeight={500}
              color="grey.900"
            >
              <IconContext.Provider
                value={{ color: "orange", className: "global-class-name" }}
              >
                <MdPayment />
              </IconContext.Provider>{" "}
              &nbsp; Seamless Payments
            </FlexBox>
          </FlexRowCenter>

          <FlexBox justifyContent="center" mb={3}>
            <Scroll to="get" duration={400} offset={-72 - 16} smooth={true}>
              <Link href="#">
                <Button
                  variant="outlined"
                  color="primary"
                  size="large"
                  sx={{
                    m: "0.5rem",
                    ":hover": {
                      backgroundColor: "#DC143C",
                      color: "black",
                    },
                  }}
                >
                  Create Seller Account
                </Button>
              </Link>
            </Scroll>

            <Scroll to="demos" duration={400} offset={-72 - 16} smooth={true}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                sx={{
                  m: "0.5rem",
                  backgroundColor: "green",
                  ":hover": {
                    backgroundColor: "grey",
                    color: "black",
                  },
                }}
              >
                View Products
              </Button>
            </Scroll>
          </FlexBox>
        </Box>
        <FlexBox justifyContent="center" mb={3}>
          <LazyImage
            alt="cover"
            width={500}
            height={500}
            // layout="responsive"
            src="/assets/images/landing/habanero.png"
          />
          <LazyImage
            alt="cover"
            width={500}
            height={500}
            // layout="responsive"
            src="/assets/images/landing/greenchilli.png"
          />
          <LazyImage
            alt="cover"
            width={500}
            height={500}
            // layout="responsive"
            src="/assets/images/landing/yam.png"
          />
        </FlexBox>
      </Container>
    </Box>
  );
};
export default Section1;
