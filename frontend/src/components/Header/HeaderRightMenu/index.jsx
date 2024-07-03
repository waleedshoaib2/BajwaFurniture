import React from "react";
import { useNavigate } from "react-router-dom";
// import IconShoppingCart from "../../../assets/shopping-cart.png";
// import IconSearch from "../../../assets/search.png";
import SearchModal from "../../Modal/SearchModal";
import { useDispatch, useSelector } from "react-redux";
import AccountIcon from "../AccountIcon";
import HeaderIcon from "../HeaderIcon";

export default function HeaderRightMenu() {
  const navigate = useNavigate();
  const [openSearchModal, setOpenSearchModal] = React.useState(false);
  const userInfo = useSelector((state) => state.user);

  function navigateHandler(e) {
    window.scrollTo(0, 0);
    navigate("/cart");
  }

  function openSearchHandler(e) {
    setOpenSearchModal((prev) => !prev);
  }

  return (
    <div className="header__container">
      <HeaderIcon
        src="https://cdn-icons-png.flaticon.com/128/3686/3686896.png"
        onClick={openSearchHandler}
      />
      {userInfo.isadmin ? (
        <HeaderIcon
          src="https://cdn-icons-png.flaticon.com/128/3144/3144456.png"
          onClick={navigateHandler}
        />
      ) : null}
      <AccountIcon />
      <SearchModal
        openModal={openSearchModal}
        setOpenModal={setOpenSearchModal}
      />
    </div>
  );
}
