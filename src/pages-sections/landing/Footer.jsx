import Link from "next/link";
import { Box, Container, Grid, IconButton, styled } from "@mui/material";
import AppStore from "components/AppStore";
import Image from "components/BazaarImage";
import { FlexBox } from "components/flex-box";
import { Paragraph } from "components/Typography";
import { Span } from "../../../src/components/Typography";

// styled component
const StyledLink = styled("a")(({ theme }) => ({
  display: "block",
  borderRadius: 4,
  cursor: "pointer",
  position: "relative",
  padding: "0.3rem 0rem",
  color: theme.palette.grey[500],
  "&:hover": {
    color: theme.palette.grey[100],
  },
}));
const Footer = () => {
  return (
    <footer>
      <Box bgcolor="#222935">
        <Container
          sx={{
            p: "1rem",
            color: "white",
          }}
        >
          <Box py={10} overflow="hidden">
            <Grid container spacing={3}>
              <Grid item lg={4} md={6} sm={6} xs={12}>
                <Link href="/">
                  {/* <a> */}
                  <Image
                    mb={2.5}
                    src="/assets/images/gryndlogo.svg"
                    alt="logo"
                  />
                  {/* </a> */}
                </Link>

                <Paragraph mb={2.5} color="grey.500">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Auctor libero id et, in gravida. Sit diam duis mauris nulla
                  cursus. Erat et lectus vel ut sollicitudin elit at amet.
                </Paragraph>

                <AppStore />
              </Grid>

              <Grid item lg={2} md={6} sm={6} xs={12}>
                <Box
                  fontSize="18px"
                  fontWeight="600"
                  mb={1.5}
                  lineHeight="1"
                  color="white"
                >
                  About Us
                </Box>

                <div>
                  {aboutLinks.map((item, ind) => (
                    <Link href="/" key={ind} passHref>
                      <StyledLink>{item}</StyledLink>
                    </Link>
                  ))}
                </div>
              </Grid>

              <Grid item lg={3} md={6} sm={6} xs={12}>
                <Box
                  fontSize="18px"
                  fontWeight="600"
                  mb={1.5}
                  lineHeight="1"
                  color="white"
                >
                  Customer Care
                </Box>

                <div>
                  {customerCareLinks.map((item, ind) => (
                    <Link href="/" key={ind} passHref>
                      <StyledLink>{item}</StyledLink>
                    </Link>
                  ))}
                </div>
              </Grid>

              <Grid item lg={3} md={6} sm={6} xs={12}>
                <Box
                  fontSize="18px"
                  fontWeight="600"
                  mb={1.5}
                  lineHeight="1"
                  color="white"
                >
                  Contact Us
                </Box>

                <Box py={0.6} color="grey.500">
                  Email:{" "}
                  <Link href="mailto:thegryndteam@gmail.com">
                    thegryndteam@gmail.com
                  </Link>
                </Box>

                <Box py={0.6} mb={2} color="grey.500">
                  Phone: <Link href="tel:+2348140165999"> +234 8140165999</Link>
                </Box>
              </Grid>
              <Grid item lg={3} md={6} sm={6} xs={12}>
                {
                  <FlexBox className="flex" alignItems="center">
                    &copy; &nbsp;{" "}
                    <Span color="#066344" fontWeight={700}>
                      {" "}
                      Grynd Tech Inc
                    </Span>{" "}
                    &nbsp;
                    {new Date().getFullYear()}
                  </FlexBox>
                }
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </footer>
  );
};
export default Footer;

const aboutLinks = [
  "Careers",
  "Our Stores",
  "Our Cares",
  "Terms & Conditions",
  "Privacy Policy",
];
const customerCareLinks = [
  "Help Center",
  "How to Buy",
  "Track Your Order",
  "Corporate & Bulk Purchasing",
  "Returns & Refunds",
];
