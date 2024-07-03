import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Meta from "../../components/Meta";
import Alert from "@mui/material/Alert";

export default function ProfilePage() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState(null);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      setName(userInfo.name);
      setEmail(userInfo.email);
      setPhoneNumber(userInfo.phoneNumber);
      setAddress(userInfo.address);
    }
  }, [navigate, userInfo]);

  const userUpdateHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      setMessage("");
      const updatedUser = {
        _id: userInfo._id,
        name: name,
        email: email,
        password: password,
        phoneNumber: phoneNumber,
        address: address,
      };

      try {
        const token = userInfo.token;
        const response = await fetch("http://localhost:4000/user/update", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedUser),
        });
        const data = await response.json();
        if (response.ok) {
          setUpdateSuccess(true);
          setMessage(null);
        } else {
          setUpdateSuccess(false);
          setMessage(data.message || "Update failed");
        }
      } catch (error) {
        setUpdateSuccess(false);
        setMessage("Server Error");
      }
    }
  };

  return (
    <div className="auth">
      <Meta title="Profile" />
      <form className="auth__container" onSubmit={userUpdateHandler}>
        {message && <Alert severity="error">{message}</Alert>}
        {updateSuccess && <Alert severity="success">Update Success!</Alert>}

        <div className="auth__title">User Profile</div>

        <div className="auth__input__container">
          <label htmlFor="update_name">Name</label>
          <input
            id="update_name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="auth__input__container">
          <label htmlFor="update_email">Email Address</label>
          <input
            id="update_email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="auth__input__container">
          <label htmlFor="update_password">New Password</label>
          <input
            id="update_password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="auth__input__container">
          <label htmlFor="update_confirm_password">Confirm New Password</label>
          <input
            id="update_confirm_password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <div className="auth__input__container">
          <label htmlFor="update_phoneNumber">Phone Number</label>
          <input
            id="update_phoneNumber"
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>

        <div className="auth__input__container">
          <label htmlFor="update_address">Address</label>
          <input
            id="update_address"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        <button className="auth-button green-button" type="submit">
          Update
        </button>

        <button className="auth-button" onClick={() => navigate("/")}>
          Go Back
        </button>
      </form>
    </div>
  );
}
