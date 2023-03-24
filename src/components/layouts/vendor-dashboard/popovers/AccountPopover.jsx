import React, { useState } from "react";
import { Avatar, Box, IconButton, Menu, MenuItem, styled } from "@mui/material";
import { H6, Small } from "components/Typography";
import Link from "next/link";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

// styled components
const Divider = styled(Box)(({ theme }) => ({
  margin: "0.5rem 0",
  border: `1px dashed ${theme.palette.grey[200]}`,
}));
const AccountPopover = ({ authUser }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const router = useRouter();
  const handleClose = () => setAnchorEl(null);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  return (
    <Box>
      <IconButton
        sx={{
          padding: 0,
        }}
        aria-haspopup="true"
        onClick={handleClick}
        aria-expanded={open ? "true" : undefined}
        aria-controls={open ? "account-menu" : undefined}
      >
        <Avatar alt="Remy Sharp" src="" />
      </IconButton>

      <Menu
        open={open}
        id="account-menu"
        anchorEl={anchorEl}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{
          horizontal: "right",
          vertical: "top",
        }}
        anchorOrigin={{
          horizontal: "right",
          vertical: "bottom",
        }}
        PaperProps={{
          elevation: 0,
          sx: {
            mt: 1,
            boxShadow: 2,
            minWidth: 200,
            borderRadius: "8px",
            overflow: "visible",
            border: "1px solid",
            borderColor: "grey.200",
            "& .MuiMenuItem-root:hover": {
              backgroundColor: "grey.200",
            },
            "&:before": {
              top: 0,
              right: 14,
              zIndex: 0,
              width: 10,
              height: 10,
              content: '""',
              display: "block",
              position: "absolute",
              borderTop: "1px solid",
              borderLeft: "1px solid",
              borderColor: "grey.200",
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
            },
          },
        }}
      >
        <Box px={2} pt={1}>
          <H6>
            {authUser?.data.firstname} {authUser?.data.surname}
          </H6>
          <Small color="red">Admin</Small>
        </Box>

        <Divider />
        <Link href="/profile">
          <MenuItem>Profile</MenuItem>
        </Link>
        <Link href="#">
          <MenuItem>My Orders</MenuItem>
        </Link>
        <Link href="#">
          <MenuItem>Settings</MenuItem>
        </Link>

        <Divider />
        <MenuItem
          onClick={() => {
            Cookies.remove("authToken");
            router.replace("/");
          }}
        >
          Logout
        </MenuItem>
      </Menu>
    </Box>
  );
};
export default AccountPopover;
