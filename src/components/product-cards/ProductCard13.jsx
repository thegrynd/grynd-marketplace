import Link from "next/link";
import { Fragment, useCallback, useState } from "react";
import { Add, Favorite, Remove, RemoveRedEye } from "@mui/icons-material";
import ShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import { Box, Button, Chip, styled } from "@mui/material";
import { useSnackbar } from "notistack";
import LazyImage from "components/LazyImage";
import BazaarCard from "components/BazaarCard";
import { H3, Small, Span } from "components/Typography";
import GryndRating from "components/GryndRating";
import { FlexBetween, FlexBox } from "components/flex-box";
import ProductViewDialog from "components/products/ProductViewDialog";
import { useAppContext } from "contexts/AppContext";
import { calculateDiscount, currency } from "lib";

const ImageWrapper = styled(Box)(({ theme }) => ({
  overflow: "hidden",
  textAlign: "center",
  position: "relative",
  padding: "44px 40px",
  background: "#efefef",
  display: "inline-block",
  [theme.breakpoints.down("sm")]: {
    display: "block",
  },
}));
const HoverWrapper = styled(FlexBetween)(({ theme }) => ({
  left: 0,
  right: 0,
  width: 120,
  height: 25,
  bottom: -40,
  margin: "auto",
  overflow: "hidden",
  background: "#fff",
  borderRadius: "5px",
  position: "absolute",
  boxShadow: theme.shadows[2],
  transition: "bottom 0.3s ease-in-out",
  "& span, & a": {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    "&:hover": {
      cursor: "pointer",
      background: "#f3f5f9",
    },
  },
  "& span": {
    padding: "0px 10px",
  },
  // "& svg": {
  //   fontSize: 18,
  //   color: "#ff0000",
  // },
}));
const StyledChip = styled(Chip)({
  zIndex: 11,
  top: "10px",
  left: "10px",
  paddingLeft: 3,
  paddingRight: 3,
  fontWeight: 600,
  fontSize: "10px",
  position: "absolute",
});
const ContentWrapper = styled(FlexBox)({
  minHeight: 110,
  padding: "1rem",
  "& .title, & .categories": {
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  },
});

// ===============================================================

// ===============================================================

const ProductCard13 = (props) => {
  const {
    off,
    id,
    price,
    imgUrl,
    rating,
    hideRating,
    hoverEffect,
    slug,
    name,
    description,
    isPublished,
    subcategory,
    authUser,
    countInStock,
  } = props;

  const { enqueueSnackbar } = useSnackbar();
  const { state, dispatch } = useAppContext();
  const [openModal, setOpenModal] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const toggleIsFavorite = () => setIsFavorite((fav) => !fav);
  const toggleDialog = useCallback(() => setOpenModal((open) => !open), []);
  const cartItem = state.cart?.find((item) => item.slug === slug);
  const handleCartAmountChange = (amount, type) => () => {
    dispatch({
      type: "CHANGE_CART_AMOUNT",
      payload: {
        price,
        imgUrl,
        id,
        name,
        qty: amount,
        slug,
        description,
        off,
        countInStock,
      },
    });
    if (type === "remove") {
      enqueueSnackbar("Remove from Cart", {
        variant: "error",
      });
    } else {
      enqueueSnackbar("Added to Cart", {
        variant: "success",
      });
    }
  };

  const StyledProductCard = styled(BazaarCard)(({ theme }) => ({
    height: "100%",
    margin: "auto",
    display: "flex",
    overflow: "hidden",
    borderRadius: "1px",
    position: "relative",
    flexDirection: "column",
    justifyContent: "space-between",
    transition: "all 250ms ease-in-out",
    background: countInStock < 1 ? "#B2BEB5" : "#B28A3D",
    "&:hover": {
      boxShadow: theme.shadows[2],
      "& .controller": {
        display: "flex",
        bottom: 20,
      },
    },
  }));

  return (
    <StyledProductCard hoverEffect={hoverEffect}>
      <ImageWrapper>
        {/* {off !== 0 && (
          <StyledChip color="primary" size="small" label={`${off}% off`} />
        )} */}

        <Link
          href={
            authUser?.data.isSeller === true
              ? `/vendor/singleproduct/${id}`
              : authUser?.data.isSeller === false ||
                (!authUser && authUser === undefined)
              ? `/client/singleproduct/${slug}`
              : ""
          }
        >
          <LazyImage
            alt={name}
            width={190}
            src={imgUrl}
            height={190}
            layout="responsive"
            objectFit="contain"
          />
        </Link>

        {countInStock < 1 ? (
          <div style={{ display: "flex", justifyContent: "flex-start" }}>
            <div
              style={{
                transform: "rotate(45deg)",
                fontSize: "16px",
                backgroundColor: "#B2BEB5",
                color: "#222935",
                padding: "0.5rem 1rem",
                margin: "0.2rem",
                borderRadius: "0.2rem",
              }}
            >
              Out of Stock
            </div>
          </div>
        ) : null}

        <HoverWrapper className="controller">
          <Span onClick={toggleDialog}>
            <RemoveRedEye fontSize="20" color="success" />
          </Span>

          <Span
            onClick={toggleIsFavorite}
            sx={{
              borderLeft: "1px solid",
              borderRight: "1px solid",
              borderColor: "grey.300",
            }}
          >
            {isFavorite ? (
              <Favorite color="primary" fontSize="20" />
            ) : (
              <FavoriteBorder fontSize="20" color="primary" />
            )}
          </Span>

          <Span
            onClick={
              countInStock < 1
                ? () => {}
                : handleCartAmountChange((cartItem?.qty || 0) + 1)
            }
          >
            <ShoppingCartIcon fontSize="20" color="grey.300" />
          </Span>
        </HoverWrapper>
      </ImageWrapper>

      <ProductViewDialog
        openDialog={openModal}
        handleCloseDialog={toggleDialog}
        product={{
          name,
          price,
          id,
          slug,
          imgGroup: [imgUrl, imgUrl],
          description,
          rating,
          subcategory,
        }}
      />

      <ContentWrapper>
        <Box flex="1 1 0" minWidth="0px" mr={1}>
          <Link
            href={
              authUser?.data.isSeller === true
                ? `/vendor/singleproduct/${id}`
                : authUser?.data.isSeller === false ||
                  (!authUser && authUser === undefined)
                ? `/client/singleproduct/${slug}`
                : ""
            }
          >
            <H3
              mb={1}
              title={name}
              fontSize="14px"
              textAlign="left"
              fontWeight="600"
              className="title"
              color="#fff"
              cursor="pointer"
            >
              {name}
            </H3>
          </Link>

          {!hideRating && (
            <FlexBox gap={1} alignItems="center">
              <GryndRating value={rating || 0} color="warn" readOnly />
              <Span color="#000">{`(${rating})`}</Span>
            </FlexBox>
          )}

          <FlexBox gap={1} alignItems="center" mt={0.5}>
            <Box fontWeight={600} color="#066344">
              {calculateDiscount(price, off)}
            </Box>

            {off !== 0 && (
              <Box color="#066344" fontWeight={300}>
                <del>
                  <em> {currency(price)}</em>
                </del>
              </Box>
            )}
          </FlexBox>
        </Box>

        <FlexBox
          width="30px"
          alignItems="center"
          className="add-cart"
          flexDirection="column-reverse"
          justifyContent={!!cartItem?.qty ? "space-between" : "flex-start"}
        >
          <Button
            color="primary"
            variant="outlined"
            sx={{
              padding: "3px",
              color: "#066344",
              borderColor: "#066344",
              borderWidth: "2px",
            }}
            onClick={handleCartAmountChange((cartItem?.qty || 0) + 1)}
            disabled={countInStock < 1}
          >
            <Add fontSize="small" />
          </Button>

          {!!cartItem?.qty && (
            <Fragment>
              <Box color="text.primary" fontWeight="600">
                {cartItem?.qty}
              </Box>

              <Button
                color="primary"
                variant="outlined"
                sx={{
                  padding: "3px",
                  borderWidth: "2px",
                }}
                onClick={handleCartAmountChange(cartItem?.qty - 1, "remove")}
              >
                <Remove fontSize="small" />
              </Button>
            </Fragment>
          )}
        </FlexBox>
      </ContentWrapper>
    </StyledProductCard>
  );
};
export default ProductCard13;
