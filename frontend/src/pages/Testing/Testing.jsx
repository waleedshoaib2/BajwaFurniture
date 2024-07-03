import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaUsers,
  FaChartBar,
  FaBox,
  FaEdit,
  FaEnvelope,
  FaAngleLeft,
  FaAngleRight,
  FaCommentAlt,
  FaUserFriends,
  FaShoppingCart,
  FaSignOutAlt,
} from "react-icons/fa";
import "./Testing.css";
import lightlogo from "./Lightlogo.svg";
import { useDispatch } from "react-redux";

import { logout } from "../../redux/action/apiUserAction";

const Testing = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const dispatch = useDispatch();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const logoutHandler = () => {
    dispatch(logout());
  };
  return (
    <div className={`sidebar ${isSidebarOpen ? "" : "collapsed"}`}>
      <div className="sidebar-header">
        <img className="logo-bf" height={100} src={lightlogo} alt="logo" />
        <button className="toggle-btn" onClick={toggleSidebar}>
          {isSidebarOpen ? <FaAngleLeft /> : <FaAngleRight />}
        </button>
      </div>
      <ul className="menu-items">
        <li>
          <Link to="/Testing">
            <FaChartBar />
            {isSidebarOpen && <span>Dashboard</span>}
          </Link>
        </li>
        <li>
          <Link to="/admin/chat">
            <FaCommentAlt />
            {isSidebarOpen && <span>Chat Support</span>}
          </Link>
        </li>
        <li>
          <Link to="/admin/categorylist/">
            <FaUsers />
            {isSidebarOpen && <span>Categories</span>}
          </Link>
        </li>
        <li>
          <Link to="/admin/orderlist">
            <FaShoppingCart />
            {isSidebarOpen && <span>Orders</span>}
          </Link>
        </li>

        <li>
          <Link to="/admin/productlist/">
            <FaBox />
            {isSidebarOpen && <span>Products</span>}
          </Link>
        </li>
        <li>
          <Link to="/getallblogs">
            <FaEdit />
            {isSidebarOpen && <span>Blogs</span>}
          </Link>
        </li>
        <li>
          <Link to="/admin/newsletter/">
            <FaEnvelope />
            {isSidebarOpen && <span>Newsletter</span>}
          </Link>
        </li>
        <li>
          <Link to="/" onClick={logoutHandler}>
            <FaSignOutAlt />
            {isSidebarOpen && <span>Logout</span>}
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Testing;
