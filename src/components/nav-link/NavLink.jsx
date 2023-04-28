import { styled } from "@mui/material";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
// styled component
const StyledLink = styled("a")(({ theme, active_route }) => ({
  position: "relative",
  transition: "color 150ms ease-in-out",
  color: active_route === "active" ? "#066344" : "inherit",
  "&:hover": {
    color: `#B28A3D !important`,
  },
}));
const NavLink = ({ href, children, style, className, ...props }) => {
  const { pathname } = useRouter();
  const checkRouteMatch = () => {
    if (href === "/") return pathname === href;
    return pathname.includes(href);
  };
  // active route
  const currentRoute = checkRouteMatch();
  return (
    // <Link href={href} passHref legacyBehavior>
    <StyledLink
      href={href}
      style={style}
      className={clsx(className)}
      active_route={currentRoute ? "active" : ""}
      {...props}
    >
      {children}
    </StyledLink>
    // </Link>
  );
};
export default NavLink;
