import { Box, Card, Container, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import TestimonialCard from "components/carousel-cards/TestimonialCard";
import Carousel from "components/carousel/Carousel";
import { FlexBox } from "components/flex-box";
import LazyImage from "components/LazyImage";
import { H3, H4 } from "components/Typography";

const Section4 = () => {
  const leftButtonStyle = {
    backgroundColor: "#066344",
  };
  const rightButtonStyle = {
    backgroundColor: "#066344",
  };
  return (
    <Container
      id="technologies"
      sx={{
        mb: "7rem",
      }}
    >
      <H3
        fontSize={28}
        textAlign="center"
        fontWeight="700"
        color="secondary.main"
        mb={8}
        textTransform="uppercase"
      >
        Testimonials
      </H3>
      <Carousel
        leftButtonStyle={leftButtonStyle}
        rightButtonStyle={rightButtonStyle}
      >
        <TestimonialCard src="./assets/images/faces/ugo.jpg" />
        <TestimonialCard src="./assets/images/faces/omotayo.jpg" />
        <TestimonialCard src="./assets/images/faces/anthony.jpg" />
        <TestimonialCard src="./assets/images/faces/julia.jpg" />
        <TestimonialCard src="./assets/images/faces/tom.jpg" />
        <TestimonialCard src="./assets/images/faces/ugo.jpg" />
      </Carousel>
    </Container>
  );
};

export default Section4;
