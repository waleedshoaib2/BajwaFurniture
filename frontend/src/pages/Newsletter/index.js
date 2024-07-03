import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import "./newsletter.css";

const Newsletter = () => {
  const { userInfo } = useSelector((state) => state.user);
  const [email, setEmail] = useState("");

  const sendTokenToBackend = async () => {
    if (!userInfo) {
      // If user is not logged in, show toast message
      toast.error("Please login to subscribe to the newsletter", {
        position: "top-right",
      });
      return;
    }

    try {
      const response = await axios.put(
        "http://localhost:4000/user/newsletter",
        {
          token: userInfo.token,
          email: email,
        },
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      console.log("Response from server:", response);

      if (response.status === 200) {
        if (response.data.message === "You already have subscribed") {
          toast.info("You're already subscribed!", {
            position: "top-right",
          });
        } else if (
          response.data.message === "Newsletter subscription updated"
        ) {
          toast.success("Subscription successful!", {
            position: "top-right",
          });
        } else if (
          response.data.message === "Email you signed up with is different"
        ) {
          toast.error("Email you signed up with is different", {
            position: "top-right",
          });
        }
      } else {
        toast.error("Failed to subscribe. Please try again later.", {
          position: "top-right",
        });
      }
    } catch (error) {
      console.error("Error sending token and email:", error);
      toast.error("Failed to subscribe. Please try again later.", {
        position: "top-right",
      });
    }
  };

  return (
    <div className="newsletter-container">
      <div className="newsletter-content">
        <img
          src="https://w0.peakpx.com/wallpaper/461/480/HD-wallpaper-chairs-furniture-interior.jpg"
          alt="Your Product"
          className="newsletter-image"
        />
        <div className="newsletter-info">
          <h1 className="newsletter-title">
            Want to keep up with our latest products?
          </h1>
          <div className="newsletter-input">
            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="newsletter-button">
            <button onClick={sendTokenToBackend}>Notify Me</button>
          </div>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
