import Link from "next/link";
import { useState, useContext } from "react";
import { Add, Remove } from "@mui/icons-material";
import { Avatar, Box, Button, Chip, Grid } from "@mui/material";
import LazyImage from "components/LazyImage";
import GryndRating from "components/GryndRating";
import { H1, H2, H3, H4, H6 } from "components/Typography";
import { useAppContext } from "contexts/AppContext";
import { FlexBox, FlexRowCenter } from "../flex-box";
import { currency } from "lib";
import productVariants from "data/product-variants";
import { Paragraph, Span } from "components/Typography";
import { LoginContext } from "contexts/LoginContext";

// ================================================================

// ================================================================

const ProductIntro = ({ product }) => {
  const {
    id,
    price,
    regularPrice,
    images,
    slug,
    name,
    rating,
    seller,
    subcategory,
    tags,
    numReviews,
    description,
  } = product || {};

  const [getAuthUser, setGetAuthUser] = useContext(LoginContext);
  const { data: authUser } = getAuthUser || {};
  console.log("auth", authUser);

  const { state, dispatch } = useAppContext();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectVariants, setSelectVariants] = useState({
    option: "option 1",
    type: "type 1",
  });

  // HANDLE CHANGE TYPE AND OPTIONS
  const handleChangeVariant = (variantName, value) => () => {
    setSelectVariants((state) => ({
      ...state,
      [variantName.toLowerCase()]: value,
    }));
  };

  // CHECK PRODUCT EXIST OR NOT IN THE CART
  const cartItem =
    id !== undefined
      ? state.cart.find((item) => item.id === id)
      : state.cart.find((item) => item.slug === slug);

  // HANDLE SELECT IMAGE
  const handleImageClick = (ind) => () => setSelectedImage(ind);

  // HANDLE CHANGE CART
  const handleCartAmountChange = (amount) => () => {
    dispatch({
      type: "CHANGE_CART_AMOUNT",
      payload: {
        price,
        qty: amount,
        name,
        imgUrl: images[0]?.url,
        id,
        slug,
        description,
      },
    });
  };
  return (
    <Box width="100%">
      <Grid container spacing={3} justifyContent="space-around">
        <Grid item md={6} xs={12} alignItems="center">
          <FlexBox justifyContent="center" mb={2}>
            <LazyImage
              alt={name}
              width={300}
              height={300}
              loading="eager"
              objectFit="contain"
              src={product?.images[selectedImage].url ?? "/"}
            />
          </FlexBox>

          <FlexBox overflow="auto">
            {images?.map((url, ind) => (
              <FlexRowCenter
                key={url._id}
                width={64}
                height={64}
                minWidth={64}
                bgcolor="white"
                border="1px solid"
                borderRadius="10px"
                ml={ind === 0 ? "auto" : 0}
                style={{
                  cursor: "pointer",
                }}
                onClick={handleImageClick(ind)}
                mr={ind === images.length - 1 ? "auto" : "10px"}
                borderColor={selectedImage === ind ? "#066344" : "grey.400"}
              >
                <Avatar
                  src={url?.url}
                  variant="square"
                  sx={{
                    height: 40,
                  }}
                />
              </FlexRowCenter>
            ))}
          </FlexBox>
        </Grid>

        <Grid item md={6} xs={12} alignItems="center">
          <H1 color="#066344">{name ?? "Loading Product Name..."}</H1>

          <FlexBox alignItems="center" mb={1}>
            <Box>Brand:</Box> &nbsp;
            <H6>{name}</H6>
          </FlexBox>
          <Paragraph my={2}>{description ?? "Loading..."}</Paragraph>

          <FlexBox alignItems="center" mb={2}>
            <Box lineHeight="1">Rated:</Box>
            <Box mx={1} lineHeight="1">
              <FlexBox alignItems="center" gap={1}>
                <GryndRating
                  color="warn"
                  fontSize="1.25rem"
                  value={rating}
                  readOnly
                />
                <H6 lineHeight="1">({numReviews ?? "Loading..."})</H6>
              </FlexBox>
            </Box>
            {/* <H6 lineHeight="1">(50)</H6> */}
          </FlexBox>

          {productVariants.map((variant) => (
            <Box key={variant.id} mb={2}>
              <H6 mb={1}>{variant.title}</H6>

              {variant.values.map(({ id, value }) => (
                <Chip
                  key={id}
                  label={value}
                  onClick={handleChangeVariant(variant.title, value)}
                  sx={{
                    borderRadius: "4px",
                    mr: 1,
                    cursor: "pointer",
                    backgroundColor:
                      selectVariants[variant.title.toLowerCase()] === value
                        ? "#066344"
                        : "default",
                    color:
                      selectVariants[variant.title.toLowerCase()] === value
                        ? "#fff"
                        : "default",
                    "&:hover": {
                      backgroundColor: "#066344",
                    },
                  }}
                />
              ))}
            </Box>
          ))}

          <Box pt={1} mb={3}>
            <Paragraph py={1} color="grey.500" fontWeight={600} fontSize={13}>
              TAGS:{" "}
              {tags?.map((tag, ind) => {
                return <Span color="#B28A3D" key={ind}>{` ${tag}, `}</Span>;
              }) ?? "Loading tags..."}
            </Paragraph>
            <Paragraph py={1} color="grey.500" fontWeight={600} fontSize={13}>
              CATEGORY:{" "}
              <Span color="#B28A3D">
                {" "}
                {subcategory?.category.name ?? "Loading categories"}
              </Span>
            </Paragraph>
            <H1 color="#B28A3D">{currency(price) ?? null}</H1>
            <H4 color="grey" fontWeight={300}>
              <s>
                {" "}
                <i> {currency(regularPrice)}</i>
              </s>
            </H4>
          </Box>

          {authUser?.data.isSeller === false ? (
            !cartItem?.qty ? (
              <Button
                color="primary"
                variant="contained"
                onClick={handleCartAmountChange(1)}
                sx={{
                  mb: 4.5,
                  px: "1.75rem",
                  height: 40,
                  backgroundColor: "#DC143C",
                  "&:hover": {
                    backgroundColor: "grey",
                  },
                }}
              >
                Add to Cart
              </Button>
            ) : (
              <FlexBox alignItems="center" mb={4.5}>
                <Button
                  size="small"
                  sx={{
                    p: 1,
                  }}
                  color="primary"
                  variant="outlined"
                  onClick={handleCartAmountChange(cartItem?.qty - 1)}
                >
                  <Remove fontSize="small" />
                </Button>

                <H3 fontWeight="600" mx={2.5}>
                  {cartItem?.qty.toString().padStart(2, "0")}
                </H3>

                <Button
                  size="small"
                  sx={{
                    p: 1,
                  }}
                  color="primary"
                  variant="outlined"
                  onClick={handleCartAmountChange(cartItem?.qty + 1)}
                >
                  <Add fontSize="small" />
                </Button>
              </FlexBox>
            )
          ) : null}
        </Grid>
      </Grid>
    </Box>
  );
};
export default ProductIntro;
