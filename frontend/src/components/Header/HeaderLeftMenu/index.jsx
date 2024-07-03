import React from "react";
import NavigationText from "./NavigationText";
import BrandIcon from "./BrandIcon";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function HeaderLeftMenu() {
  const navigate = useNavigate();
  let { userInfo } = useSelector((state) => state.user);

  function navigateHandler(url) {
    window.scrollTo(0, 0);
    navigate(url);
  }

  return (
    <div className="header__container">
      {userInfo && userInfo.isAdmin ? (
        <></>
      ) : (
        // <div
        //   style={{
        //     width: "270px",
        //     height: "380px",
        //     backgroundColor: "black",
        //     padding: 50,
        //     marginTop: 150,
        //   }}
        // >
        //   <img className="logo-bf" src="./lightlogo.svg" alt="logo" />
        // </div>
        <>
          <img className="logo-bf" src="./logo.svg" alt="logo" />
          <NavigationText text={"Home"} url="/" />
          <NavigationText text={"Blogs"} url="/blogs" />
          <NavigationText text={"Products"} url="/shop" />

          <NavigationText text={"Newsletter"} url="/newsletter" />
          <NavigationText text={"About Us"} url="/aboutus" />
        </>
      )}
    </div>
  );
}
