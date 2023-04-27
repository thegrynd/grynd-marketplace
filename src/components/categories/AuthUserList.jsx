import React, { useContext } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { RiLogoutCircleRFill } from "react-icons/ri";
import { MdDashboardCustomize } from "react-icons/md";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { IconContext } from "react-icons";
import { LoginContext } from "contexts/LoginContext";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { H5 } from "components/Typography";

export default function AuthUserList({ anchorEl, openList, handleCloseMenu }) {
  const router = useRouter();
  const [getAuthUser] = useContext(LoginContext);
  const { data: authUser } = getAuthUser || {};
  //   console.log("AuthUser", authUser);

  const handleLogout = () => {
    Cookies.remove("authToken");
    window.localStorage.removeItem("GRYND_SHOPPING_CART");
    router.reload();
  };

  const isUser = authUser?.data.role === "user" || undefined || !authUser;
  return (
    <div>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={openList}
        onClose={handleCloseMenu}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleCloseMenu}>
          <IconContext.Provider value={{ color: "#B28A3D", size: "1.25rem" }}>
            <BsFillPersonLinesFill />
          </IconContext.Provider>{" "}
          &nbsp; <H5 fontWeight={400}>Profile</H5>
        </MenuItem>
        <MenuItem onClick={handleCloseMenu} disabled={isUser}>
          <IconContext.Provider value={{ color: "#B28A3D", size: "1.25rem" }}>
            <MdDashboardCustomize />
          </IconContext.Provider>{" "}
          &nbsp; <H5 fontWeight={400}> Admin Dashboard</H5>
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <IconContext.Provider value={{ color: "#B28A3D", size: "1.25rem" }}>
            <RiLogoutCircleRFill />
          </IconContext.Provider>{" "}
          &nbsp; <H5 fontWeight={400}> Logout</H5>
        </MenuItem>
      </Menu>
    </div>
  );
}
