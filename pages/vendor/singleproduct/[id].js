import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Box } from "@mui/material";
import Link from "next/link";
import Button from "@mui/material/Button";
import { Add, Close, Remove } from "@mui/icons-material";
import { Divider, Grid, IconButton, styled } from "@mui/material";
import { FlexBox } from "components/flex-box";
import BazaarImage from "components/BazaarImage";
import GryndRating from "components/GryndRating";
import Carousel from "components/carousel/Carousel";
import axios from "axios";
import Cookies from "js-cookie";
import useSWR, { preload } from "swr";
import SellerInfo from "../../../src/components/SellerInfo";
import ShopLayout1 from "components/layouts/ShopLayout1";
import ProductIntro from "components/products/ProductIntro";

// styled components
const ContentWrapper = styled(Box)(({ theme }) => ({
  "@media (max-width: 760px)": {
    margin: "2rem 1rem 1rem 1rem",
  },
  margin: "3rem 5rem 5rem 5rem",
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
    <ShopLayout1>
      <ContentWrapper>
        <Link href={``} passHref>
          <Button
            color="primary"
            onClick={() => back()}
            sx={{
              px: 4,
              bgcolor: "#066344",
              color: "#ffffff",
              ":hover": {
                color: "#000000",
                backgroundColor: "grey",
              },
            }}
          >
            Go Back
          </Button>
        </Link>
        <Grid container spacing={3}>
          {/* <Grid item md={6} xs={12}>
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
          </Grid> */}
          <Grid item md={12} xs={12}>
            <ProductIntro product={singleProductData} />
          </Grid>

          <Grid item md={12} xs={12} alignSelf="center">
            <SellerInfo
              singleProductData={singleProductData}
              GryndRating={
                <GryndRating
                  color="warn"
                  fontSize="1.25rem"
                  value={singleProductData?.rating}
                  readOnly
                />
              }
            />
          </Grid>
        </Grid>
      </ContentWrapper>
    </ShopLayout1>
  );
}
