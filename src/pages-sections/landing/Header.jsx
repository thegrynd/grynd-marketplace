import { Fragment, useEffect, useState, useContext, useRef } from "react";
import { Link as Scroll } from "react-scroll";
import {
  Box,
  Button,
  Container,
  IconButton,
  Typography,
  useMediaQuery,
  Badge,
} from "@mui/material";
import Menu from "@mui/icons-material/Menu";
import { styled } from "@mui/material/styles";
import { keyframes } from "@mui/styled-engine";
import clsx from "clsx";
import Image from "components/BazaarImage";
import { FlexBox } from "components/flex-box";
import Sidenav from "components/Sidenav";
import debounce from "lodash/debounce";
import Link from "next/link";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { LoginContext } from "contexts/LoginContext";
import { Small } from "components/Typography";
import { useAppContext } from "contexts/AppContext";
import ShoppingBagOutlined from "components/icons/ShoppingBagOutlined";
import MiniCart from "components/MiniCart";
import { useRouter } from "next/router";

import { ThreeCircles } from "react-loader-spinner";
import AuthUserList from "components/categories/AuthUserList";

const headerHeight = 72;
const slideFromTop = keyframes`
from { top: -${headerHeight}px; }
to { top: 0; }`;
const HeaderWrapper = styled(Box)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.grey[200]}`,
  "& .link": {
    cursor: "pointer",
    transition: "color 250ms ease-in-out",
    fontWeight: 500,
    "&:hover": {
      color: theme.palette.primary.main,
    },
  },
  "& .fixedHeader": {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 99,
    background: "white",
    height: headerHeight,
    boxShadow: theme.shadows[2],
    animation: `${slideFromTop} 250ms ease-in-out`,
    "& .link": {
      color: "inherit",
    },
  },
  [theme.breakpoints.down("sm")]: {
    "& .right-links": {
      display: "none",
    },
    "& .purchase-link": {
      display: "none",
    },
  },
}));
const Header = () => {
  const { state } = useAppContext();
  console.log("myState", state);

  const router = useRouter();

  const [getAuthUser, setGetAuthUser, loadUser] = useContext(LoginContext);
  const { data: authUser } = getAuthUser || {};
  // console.log("AuthUser", authUser);

  // user options
  const [anchorEl, setAnchorEl] = useState(null);
  const openList = Boolean(anchorEl);
  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  //

  const [open, setOpen] = useState(false);
  const [isFixed, setFixed] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  const toggleMiniCart = () => {
    setIsHovering(!isHovering);
  };

  const downSM = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const toggleSidenav = () => setOpen((open) => !open);
  const scrollListener = debounce(() => {
    if (window?.pageYOffset >= headerHeight) setFixed(true);
    else setFixed(false);
  }, 50);

  useEffect(() => {
    if (!window) return null;
    window.addEventListener("scroll", scrollListener);
    return () => window.removeEventListener("scroll", scrollListener);
  }, [scrollListener]);

  // text for user chip
  const AvatarText = () => {
    return (
      <>
        <Small fontSize="10px">
          <a href={authUser?.data.isSeller === true ? "/profile" : "/profile"}>
            <span
              style={{
                color: "#B28A3D",
                fontWeight: 700,
                cursor: "pointer",
                marginLeft: "0.5rem",
              }}
            >
              {" "}
              {authUser?.success == true
                ? `${authUser?.data.firstname} ${authUser?.data.surname}`
                : authUser === undefined && loadUser === true
                ? "Loading User"
                : null}
            </span>
          </a>
          <br />
          <div style={{ marginLeft: "0.5rem" }}>
            {" "}
            {authUser?.data.username ?? "User"}
          </div>
        </Small>
      </>
    );
  };

  return (
    <Fragment>
      <HeaderWrapper>
        <Box
          className={clsx({
            fixedHeader: isFixed,
          })}
        >
          <Container>
            <FlexBox height={headerHeight} alignItems="center">
              <Scroll to="top" duration={400} smooth={true} isDynamic>
                <Box
                  sx={{
                    cursor: "pointer",
                  }}
                >
                  <Image
                    width="96px"
                    height="44px"
                    src="/assets/images/gryndlogo.svg"
                    alt="logo"
                  />
                </Box>
              </Scroll>

              <Box
                sx={{
                  mx: "auto",
                }}
              ></Box>

              <FlexBox className="right-links" alignItems="center">
                <Scroll
                  to="features"
                  duration={400}
                  offset={-headerHeight - 16}
                  smooth={true}
                >
                  <Typography
                    className="link"
                    color="#066344"
                    p="0.25rem 1.25rem"
                  >
                    Features
                  </Typography>
                </Scroll>

                <Scroll
                  to="products"
                  duration={400}
                  offset={-headerHeight - 16}
                  smooth={true}
                >
                  <Typography
                    className="link"
                    color="#066344"
                    p="0.25rem 1.25rem"
                  >
                    Products
                  </Typography>
                </Scroll>

                <Scroll
                  to="testimonials"
                  duration={400}
                  offset={-headerHeight - 16}
                  smooth={true}
                >
                  <Typography
                    className="link"
                    color="#066344"
                    p="0.25rem 1.25rem"
                  >
                    Testimonials
                  </Typography>
                </Scroll>
              </FlexBox>

              {!downSM && authUser?.success === false ? (
                <a href="./login-user">
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "green",
                      color: "white",
                      "&:hover": {
                        color: "black",
                        backgroundColor: "grey",
                      },
                    }}
                    className="login-btn"
                  >
                    Log In
                  </Button>
                </a>
              ) : !downSM && authUser?.success === undefined ? (
                <a href="./login-user">
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "green",
                      color: "white",
                      "&:hover": {
                        color: "black",
                        backgroundColor: "grey",
                      },
                    }}
                    className="login-btn"
                  >
                    Log In
                  </Button>
                </a>
              ) : (
                ""
              )}

              {!authUser ? (
                ""
              ) : (
                <>
                  <Stack direction="row" spacing={1} ml="1rem" mr="1rem">
                    {/* <Chip avatar={<Avatar>M</Avatar>} label="Avatar" /> */}
                    <Chip
                      avatar={
                        <Button
                          id="basic-button"
                          aria-controls={openList ? "basic-menu" : undefined}
                          aria-haspopup="true"
                          aria-expanded={openList ? "true" : undefined}
                          onClick={handleClickMenu}
                        >
                          <Avatar
                            alt={authUser?.data.username ?? "Logged in user"}
                            src={
                              authUser?.data.avatar.url
                                ? authUser.data.avatar.url
                                : ""
                            }
                            sx={{
                              border: "2px dotted #066344",
                              ":hover": {
                                border: "2px dotted #B28A3D",
                              },
                            }}
                          />
                        </Button>
                      }
                      label={<AvatarText />}
                      variant="outlined"
                      sx={{ boxSizing: "border-box", padding: "1rem 0" }}
                    />
                  </Stack>

                  <AuthUserList
                    anchorEl={anchorEl}
                    openList={openList}
                    handleCloseMenu={handleCloseMenu}
                    setAnchorEl={setAnchorEl}
                  />
                </>
              )}

              <FlexBox
                gap={1.5}
                alignItems="center"
                ml={!authUser ? "1rem" : 0}
              >
                <Badge
                  badgeContent={state.cart?.length}
                  color="primary"
                  onClick={toggleMiniCart}
                >
                  <Box
                    p={1.25}
                    bgcolor="grey.200"
                    component={IconButton}
                    onClick={toggleSidenav}
                  >
                    <ShoppingBagOutlined />
                  </Box>
                </Badge>
              </FlexBox>

              {/* mobile menu */}
              {downSM && (
                <Sidenav
                  open={open}
                  width={260}
                  position="right"
                  toggleSidenav={toggleSidenav}
                  handle={
                    <IconButton>
                      <Menu />
                    </IconButton>
                  }
                >
                  <Box
                    p={2}
                    sx={{
                      "& .link": {
                        cursor: "pointer",
                        transition: "color 250ms ease-in-out",
                        "&:hover": {
                          color: "primary.main",
                        },
                      },
                    }}
                  >
                    <Scroll
                      to="features"
                      duration={400}
                      offset={-headerHeight - 16}
                      smooth={true}
                    >
                      <Typography
                        className="link"
                        py={1}
                        onClick={toggleSidenav}
                      >
                        Features
                      </Typography>
                    </Scroll>

                    <Scroll
                      to="demos"
                      duration={400}
                      offset={-headerHeight - 16}
                      smooth={true}
                    >
                      <Typography
                        className="link"
                        py={1}
                        onClick={toggleSidenav}
                      >
                        Demos
                      </Typography>
                    </Scroll>

                    <Scroll
                      smooth={true}
                      duration={400}
                      to="technologies"
                      offset={-headerHeight - 16}
                    >
                      <Typography
                        className="link"
                        py={1}
                        mb={2}
                        onClick={toggleSidenav}
                      >
                        Technologies
                      </Typography>
                    </Scroll>

                    <Link href="#" passHref legacyBehavior>
                      <Button variant="outlined" color="primary">
                        Sign Up
                      </Button>
                    </Link>
                  </Box>
                </Sidenav>
              )}
            </FlexBox>
          </Container>
        </Box>
      </HeaderWrapper>
      <FlexBox justifyContent="flex-end">
        {isHovering && <MiniCart handleMouseOut={handleMouseOut} />}
      </FlexBox>
      {isFixed && <Box height={headerHeight} />}
    </Fragment>
  );
};
export default Header;
