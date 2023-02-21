import { Box, Button, styled, TextField } from "@mui/material";
import { H1 } from "components/Typography";
import { SearchOutlinedIcon } from "components/search-box/styled";
const leftImg = "/assets/images/landing/yam.png";
const midImg = "/assets/images/landing/habanero.png";
const rightImg = "/assets/images/landing/greenchilli.png";

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
      <H1 maxWidth={600} mx="auto" color="#066344">
        Your Number One Agro Marketplace
      </H1>

      <Box className="searchBox">
        <TextField
          placeholder="Searching products"
          fullWidth
          InputProps={{
            sx: {
              height: 50,
              paddingRight: 0,
              color: "grey.700",
              background: "#fff",
              "& fieldset": {
                border: "none",
              },
            },
            endAdornment: SEARCH_BUTTON,
            startAdornment: <SearchOutlinedIcon fontSize="small" />,
          }}
        />
      </Box>
    </Container>
  );
};
export default Section1;
