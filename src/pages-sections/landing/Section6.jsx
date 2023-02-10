import { Avatar, Box, Container, Button, Grid } from "@mui/material";
import { FlexBox } from "components/flex-box";
import { H2, Paragraph } from "components/Typography";
import Router from "next/router";
const list = [
  {
    title: "Tubers",
    thumbnail: "/assets/images/landing/yam.png",
    subTitle:
      "9 Niche shop demos for online store. Super store, Fashion, Electronic, Grocery and etc",
    category: "homepage",
    buttonText: "Browse Tubers",
  },
  {
    title: "Veggies",
    thumbnail: "/assets/images/landing/habanero.png",
    subTitle:
      "Clean Shop inner pages. Vendor shop, Sale/discount pages, checkout, cart and etc.",
    category: "shop",
    buttonText: "Browse Veggies",
  },
  {
    title: "Fruits",
    thumbnail: "/assets/images/landing/plantain.png",
    subTitle:
      "Structured user dashboard for managing user account, orders, address and etc.",
    category: "user",
    buttonText: "Browse Fruits",
  },
  {
    title: "Cash crops",
    thumbnail: "/assets/images/landing/avocado.jpg",
    subTitle: "30+ Super admin and vendor dashboard interfaces.",
    category: "admin",
    buttonText: "Browse Cash crops",
  },
];

// ==================================================================

// ==================================================================

const Section6 = ({ setFilterDemo }) => {
  const handleNavigate = (active) => () => {
    Router.push("#section-3");
    setFilterDemo(active);
  };
  return (
    <Box
      id="get"
      sx={{
        backgroundColor: "grey.100",
      }}
    >
      <Container
        sx={{
          py: 18,
        }}
      >
        <H2
          fontSize={28}
          textAlign="center"
          fontWeight="700"
          color="primary"
          mb={8}
          textTransform="uppercase"
        >
          Check out products that suit your need
        </H2>

        <Grid container spacing={6}>
          {list.map((item, index) => (
            <Grid item md={6} xs={12} key={index}>
              <FlexBox
                gap={3}
                sx={{
                  flexDirection: {
                    sm: "row",
                    xs: "column",
                  },
                }}
              >
                <Avatar
                  src={item.thumbnail}
                  sx={{
                    boxShadow: 1,
                    borderRadius: "10px",
                    height: "auto",
                    width: {
                      sm: 250,
                      xs: "100%",
                    },
                  }}
                />

                <FlexBox flexDirection="column" alignItems="flex-start">
                  <H2 fontSize={22} mb={1} color="green">
                    {item.title}
                  </H2>
                  <Paragraph mb={2}>{item.subTitle}</Paragraph>
                  <Box m="auto"></Box>
                  <Button
                    onClick={handleNavigate(item.category)}
                    variant="outlined"
                    color="primary"
                  >
                    {item.buttonText}
                  </Button>
                </FlexBox>
              </FlexBox>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};
export default Section6;
