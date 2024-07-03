import React from "react";
import { Link } from "react-router-dom";
import "./AdminSidebar.css"; // Make sure to create AdminSidebar.css for styling
import {
  FaUsers,
  FaFolder,
  FaBlog,
  FaShoppingCart,
  FaClipboardList,
  FaUserCircle,
  FaNewspaper,
  FaSignOutAlt,
} from "react-icons/fa";
const AdminSidebar = () => {
  return (
    <div className="admin-sidebar" style={{ height: "100%" }}>
      <ul>
        <li>
          <Link to="/admin/userlist" className="black-button">
            <FaUsers /> Users
          </Link>
        </li>
        <li>
          <Link to="/admin/categorylist" className="black-button">
            <FaFolder /> Category
          </Link>
        </li>
        <li>
          <Link to="/getallblogs" className="black-button">
            <FaBlog /> Blogs
          </Link>
        </li>
        <li>
          <Link to="/admin/productlist" className="black-button">
            <FaShoppingCart /> Products
          </Link>
        </li>
        <li>
          <Link to="/admin/chat" className="black-button">
            <FaSignOutAlt /> Messages
          </Link>
        </li>
        <li>
          <Link to="/admin/orderlist" className="black-button">
            <FaClipboardList /> Orders
          </Link>
        </li>

        <li>
          <Link to="/admin/newsletter" className="black-button">
            <FaNewspaper /> Newsletter
          </Link>
        </li>
        <li>
          <Link to="/" className="black-button">
            <FaSignOutAlt /> Logout
          </Link>
        </li>

        {/* Add more sidebar items as needed */}
      </ul>
    </div>
  );
};

export default AdminSidebar;
