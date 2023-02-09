import React from "react";
import { FlexBox } from "components/flex-box";
import Avatar from "@mui/material/Avatar";
import Image from "next/image";

const TestimonialCard = ({ src }) => {
  return (
    <>
      <FlexBox>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Unde laborum
        magni, sint quo inventore deleniti distinctio aspernatur officia
        temporibus quaerat nisi ullam eaque necessitatibus a?
      </FlexBox>{" "}
      <br />
      <FlexBox justifyContent="center">
        <Avatar alt="Remy Sharp" src={src} />
      </FlexBox>
    </>
  );
};

export default TestimonialCard;
