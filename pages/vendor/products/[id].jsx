import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Box } from "@mui/material";
import * as yup from "yup";
import { H1, H2, H3, H6, Paragraph } from "components/Typography";
import Button from "@mui/material/Button";
import { Add, Close, Remove } from "@mui/icons-material";
import { Divider, Grid, IconButton, styled } from "@mui/material";
import { FlexBox } from "components/flex-box";
import BazaarImage from "components/BazaarImage";
import BazaarRating from "components/BazaarRating";
import Carousel from "components/carousel/Carousel";
import VendorDashboardLayout from "components/layouts/vendor-dashboard";
import axios from "axios";
import Cookies from "js-cookie";
import useSWR, { preload } from "swr";
import SellerInfo from "../../../src/components/SellerInfo";
import { currency } from "lib";

// =============================================================================
UploadProduct.getLayout = function getLayout(page) {
  return <VendorDashboardLayout>{page}</VendorDashboardLayout>;
};
// =============================================================================

// styled components
const ContentWrapper = styled(Box)(({ theme }) => ({
  marginBottom: "10rem",
  "& .carousel:hover": {
    cursor: "pointer",
    "& .carousel__back-button": {
      opacity: 1,
      left: 10,
    },
    "& .carousel__next-button": {
      opacity: 1,
      right: 10,
    },
  },
  "& .carousel__next-button, & .carousel__back-button": {
    opacity: 0,
    boxShadow: "none",
    transition: "all 0.3s",
    background: "transparent",
    color: theme.palette.primary.main,
    ":disabled": {
      color: theme.palette.grey[500],
    },
    ":hover": {
      color: theme.palette.primary.main,
      backgroundColor: "transparent",
    },
  },
  "& .carousel__back-button": {
    left: 0,
  },
  "& .carousel__next-button": {
    right: 0,
  },
}));

// =====================================================

// =====================================================

export default function UploadProduct({ product }) {
  const { query } = useRouter();
  const [show, setShow] = useState(false);
  const token = Cookies.get("authToken");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const address = `${process.env.NEXT_PUBLIC_GRYND_URL}/api/v2/products/${query.id}`;

  const fetcher = async (url) => await axios.get(url, config);
  const { data, error } = useSWR(address, fetcher);

  // preload in effects;
  useEffect(() => {
    preload(address, fetcher);
  }, []);

  const { data: singleProductData } = data?.data || {};
  console.log("singleProductData", singleProductData);

  return (
    <ContentWrapper>
      <Grid container spacing={3}>
        <Grid item md={6} xs={12}>
          <Carousel
            totalSlides={singleProductData?.images.length}
            visibleSlides={1}
          >
            {singleProductData?.images?.map((item, index) => (
              <BazaarImage
                key={index}
                src={item.url}
                sx={{
                  mx: "auto",
                  width: "100%",
                  objectFit: "contain",
                  height: {
                    sm: 400,
                    xs: 250,
                  },
                }}
              />
            ))}
          </Carousel>
        </Grid>

        <Grid item md={6} xs={12} alignSelf="center">
          <H2 color="#066344">{singleProductData?.name}</H2>

          <Paragraph py={1} color="grey.500" fontWeight={600} fontSize={13}>
            CATEGORY: {singleProductData?.subcategory?.category.name}
          </Paragraph>

          <H1 color="#B28A3D">{currency(singleProductData?.price)}</H1>

          <FlexBox alignItems="center" gap={1}>
            <BazaarRating
              color="warn"
              fontSize="1.25rem"
              value={singleProductData?.rating}
              readOnly
            />
            <H6 lineHeight="1">({singleProductData?.numReviews})</H6>
          </FlexBox>

          <Paragraph my={2}>{singleProductData?.description}</Paragraph>

          <Divider
            sx={{
              mb: 2,
            }}
          />
        </Grid>
        <Grid item md={12} xs={12} alignSelf="center">
          <SellerInfo singleProductData={singleProductData} />
        </Grid>
      </Grid>
    </ContentWrapper>
  );
}
