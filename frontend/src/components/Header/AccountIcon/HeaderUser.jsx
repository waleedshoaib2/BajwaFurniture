import React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/action/apiUserAction";

const MenuItemStyle = {
  fontFamily: "'Source Sans Pro', sans-serif",
  color: "black",
  width: "150px",
  display: "flex",
  justifyContent: "center",
};

const MenuStyle = {
  marginTop: "10px",
};

export default function HeaderUser({
  userInfo,
  anchorEl,
  openAnchor,
  setOpenAnchor,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <div
      className="margin-inline-end-20 cursor-pointer"
      ref={anchorEl}
      onClick={() => setOpenAnchor(!openAnchor)}
    >
      <h1 className="header__account-text">{userInfo.name}</h1>
      <Menu
        anchorEl={anchorEl.current}
        open={openAnchor}
        onClose={() => setOpenAnchor(false)}
        sx={MenuStyle}
      >
        <MenuItem onClick={() => navigate("/profile")} sx={MenuItemStyle}>
          Profile
        </MenuItem>
        <MenuItem onClick={() => navigate("/orders")} sx={MenuItemStyle}>
          Orders
        </MenuItem>
        <MenuItem
          onClick={() => navigate("/recommendation")}
          sx={MenuItemStyle}
        >
          Recommendation
        </MenuItem>
        <MenuItem onClick={logoutHandler} sx={MenuItemStyle}>
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
}
