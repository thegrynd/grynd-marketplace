import Link from "next/link";
import { useState } from "react";
import { Add, Remove } from "@mui/icons-material";
import { Avatar, Box, Button, Chip, Grid } from "@mui/material";
import LazyImage from "components/LazyImage";
import BazaarRating from "components/BazaarRating";
import { H1, H2, H3, H4, H6 } from "components/Typography";
import { useAppContext } from "contexts/AppContext";
import { FlexBox, FlexRowCenter } from "../flex-box";
import { currency } from "lib";
import productVariants from "data/product-variants";

// ================================================================

// ================================================================

const ProductIntro = ({ product }) => {
  const { id, price, regularPrice, images, slug, name, rating, seller } =
    product;
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
  const cartItem = state.cart.find((item) => item.id === id);

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
      },
    });
  };
  return (
    <Box width="100%">
      <Grid container spacing={3} justifyContent="space-around">
        <Grid item md={6} xs={12} alignItems="center">
          <FlexBox justifyContent="center" mb={6}>
            <LazyImage
              alt={name}
              width={300}
              height={300}
              loading="eager"
              objectFit="contain"
              src={product.images[selectedImage].url}
            />
          </FlexBox>

          <FlexBox overflow="auto">
            {images.map((url, ind) => (
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
          <H1 mb={1}>{name}</H1>

          <FlexBox alignItems="center" mb={1}>
            <Box>Brand:</Box> &nbsp;
            <H6>{name}</H6>
          </FlexBox>

          <FlexBox alignItems="center" mb={2}>
            <Box lineHeight="1">Rated:</Box>
            <Box mx={1} lineHeight="1">
              <BazaarRating
                color="warn"
                fontSize="1.25rem"
                value={rating}
                readOnly
              />
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
            <H2 color="#066344" mb={0.5} lineHeight="1">
              {currency(price)}
            </H2>
            <H4 color="grey" fontWeight={300}>
              <s>
                {" "}
                <i> {currency(regularPrice)}</i>
              </s>
            </H4>
            <Box color="inherit">Stock Available</Box>
          </Box>

          {!cartItem?.qty ? (
            <Button
              color="primary"
              variant="contained"
              onClick={handleCartAmountChange(1)}
              sx={{
                mb: 4.5,
                px: "1.75rem",
                height: 40,
                backgroundColor: "#066344",
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
          )}

          <FlexBox alignItems="center" mb={2}>
            <Box>Sold By:</Box>
            <Link href="/shops/scarlett-beauty" passHref>
              {/* <a> */}
              <H6 ml={1}>{seller.storeName}</H6>
              {/* </a> */}
            </Link>
          </FlexBox>
        </Grid>
      </Grid>
    </Box>
  );
};
export default ProductIntro;
