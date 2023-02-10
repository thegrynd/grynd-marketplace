import { Card, Container, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import BazaarImage from "components/BazaarImage";
import { H2, H4 } from "components/Typography";

// styled components
const StyledContent = styled("div")(({ theme }) => ({
  position: "relative",
  zIndex: 1,
  "&:after": {
    content: '" "',
    position: "absolute",
    height: "100px",
    width: "200px",
    top: 0,
    right: 0,
    background: theme.palette.grey[300],
    zIndex: -1,
    borderRadius: "300px 300px 0 0",
    marginRight: -100,
  },
  "&:before": {
    content: '" "',
    position: "absolute",
    height: "100px",
    width: "200px",
    bottom: 0,
    left: 0,
    background: theme.palette.grey[300],
    zIndex: -1,
    borderRadius: "0 0 300px 300px",
    marginLeft: -100,
    marginBottom: -50,
  },
}));
const StyledCard = styled(Card)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "260px",
});
const Section2 = () => {
  return (
    <Container
      id="features"
      sx={{
        mt: 18,
      }}
    >
      <H2
        mb={8}
        fontSize={28}
        fontWeight="700"
        textAlign="center"
        color="secondary.main"
        textTransform="uppercase"
      >
        Powerful Features
      </H2>
    </Container>
  );
};
const list = [
  {
    icon: "verify",
    title: "SEO Friendly",
  },
  {
    icon: "cloud-data",
    title: "REST API",
  },
  {
    icon: "multivendor",
    title: "Multi-Vendor Support",
  },
  {
    icon: "optimization",
    title: "Optimized for Mobile",
  },
  {
    icon: "code",
    title: "Clean Code",
  },
  {
    icon: "lighting",
    title: "Fast",
  },
  {
    icon: "admin-dashboard",
    title: "Admin Dashboard",
  },
  {
    icon: "figma",
    title: "Figma Ready",
  },
];
export default Section2;
