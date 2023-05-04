import { Fragment, useContext } from "react";
import { useRouter } from "next/router";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PersonIcon from "@mui/icons-material/Person";
import PlaceIcon from "@mui/icons-material/Place";
import ShoppingBagOutlined from "@mui/icons-material/ShoppingBagOutlined";
import { FlexBox } from "components/flex-box";
import CustomerService from "components/icons/CustomerService";
import NavLink from "components/nav-link/NavLink";
import { AuthUserOrderContext } from "contexts/AuthUserOrderContext";
import { Span } from "components/Typography";

// custom styled components
const MainContainer = styled(Card)(({ theme }) => ({
  paddingBottom: "1.5rem",
  [theme.breakpoints.down("md")]: {
    boxShadow: "none",
    overflowY: "auto",
    height: "calc(100vh - 64px)",
  },
}));
const StyledNavLink = styled(({ children, isCurrentPath, ...rest }) => (
  <NavLink {...rest}>{children}</NavLink>
))(({ theme, isCurrentPath }) => ({
  display: "flex",
  alignItems: "center",
  borderLeft: "4px solid",
  paddingLeft: "1.5rem",
  paddingRight: "1.5rem",
  marginBottom: "1.25rem",
  justifyContent: "space-between",
  borderColor: isCurrentPath ? "#066344" : "transparent",
  "& .nav-icon": {
    color: isCurrentPath ? "#066344" : theme.palette.grey[600],
  },
  "&:hover": {
    borderColor: "#B28A3D",
    "& .nav-icon": {
      color: "#B28A3D",
    },
  },
}));
const Navigations = () => {
  const { pathname } = useRouter();
  const [authUserOrderData] = useContext(AuthUserOrderContext);
  // console.log("authUserOrderData", authUserOrderData);

  const linkList = [
    {
      title: "DASHBOARD",
      list: [
        {
          href: "/orders",
          title: "Your Orders",
          icon: ShoppingBagOutlined,
          count: authUserOrderData?.totalDocs,
        },
        {
          href: "/wish-list",
          title: "Your Wishlist",
          icon: FavoriteBorderIcon,
          count: 0,
        },
        {
          href: "/support-tickets",
          title: "Support Tickets",
          icon: CustomerService,
          count: 0,
        },
      ],
    },
    {
      title: "ACCOUNT SETTINGS",
      list: [
        {
          href: "/profile",
          title: "Profile Info",
          icon: PersonIcon,
        },
        // {
        //   href: "/address",
        //   title: "Pickup Addresses",
        //   icon: PlaceIcon,
        //   count: 16,
        // },
        // {
        //   href: "/payment-methods",
        //   title: "Payment Methods",
        //   icon: CreditCardIcon,
        //   count: 4,
        // },
      ],
    },
  ];
  return (
    <MainContainer>
      {linkList.map((item) => (
        <Fragment key={item.title}>
          <Typography
            p="26px 30px 1rem"
            color="green"
            fontSize="12px"
            fontWeight={700}
          >
            {item.title}
          </Typography>

          {item.list.map((item) => (
            <StyledNavLink
              href={item.href}
              key={item.title}
              isCurrentPath={pathname.includes(item.href)}
            >
              <FlexBox alignItems="center" gap={1}>
                <item.icon
                  color="inherit"
                  fontSize="small"
                  className="nav-icon"
                />
                <Span fontWeight="400">{item.title}</Span>
              </FlexBox>

              <span>{item.count}</span>
            </StyledNavLink>
          ))}
        </Fragment>
      ))}
    </MainContainer>
  );
};

export default Navigations;
