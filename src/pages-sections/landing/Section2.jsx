import { Box, Container, Grid, styled } from "@mui/material";
import { CiDeliveryTruck } from "react-icons/ci";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import { BsHandThumbsUp, BsCurrencyExchange } from "react-icons/bs";
import { IconContext } from "react-icons";
import { FlexBox } from "components/flex-box";
import { H4, Span } from "components/Typography";
// styled components
const StyledFlexBox = styled(FlexBox)(({ theme }) => ({
  flexWrap: "wrap",
  padding: "1.5rem",
  background: "transparent",
  borderRadius: "8px",
  boxShadow: theme.shadows[2],
  [theme.breakpoints.down("sm")]: {
    textAlign: "center",
    padding: "1rem 0.5rem",
    flexDirection: "column",
  },
}));

const serviceData = [
  {
    text: "Fast Delivery ",
    description: "Get any product you order within a matter of hours to days",
    icon: <CiDeliveryTruck />,
  },
  {
    text: "Trusted Vendors",
    description: "Our vendors are verified and vetted",
    icon: <VscWorkspaceTrusted />,
  },
  {
    text: "Quality Agro Produce",
    description: "We offer only top quality fresh produce",
    icon: <BsHandThumbsUp />,
  },
  {
    text: "Become A Seller",
    description: "Become a vendor, sell your agro products and earn money",
    icon: <BsCurrencyExchange />,
  },
];

// =============================================================

// =============================================================

const Section2 = () => {
  return (
    <Container
      sx={{
        pt: 12,
        pb: 8,
      }}
    >
      <Grid container spacing={3}>
        {serviceData.map((service) => (
          <Grid item lg={3} md={6} sm={6} xs={12}>
            <StyledFlexBox alignItems="center" gap={2}>
              <FlexBox alignItems="center" color="#066344" fontSize="50px">
                {service.icon}
              </FlexBox>
              <span style={{ color: "#066344", fontWeight: 700 }}>
                {service.text}
              </span>
              <Box>
                <H4 color="grey.900" fontSize="1rem" fontWeight="700"></H4>
                <Span color="grey.600">{service.description}</Span>
              </Box>
            </StyledFlexBox>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
export default Section2;
