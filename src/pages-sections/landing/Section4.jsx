import { Box, Card, Container, Grid } from "@mui/material";
import TestimonialCard from "components/carousel-cards/TestimonialCard";
import Carousel from "components/carousel/Carousel";
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
        id="testimonials"
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
