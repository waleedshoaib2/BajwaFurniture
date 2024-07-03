import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Listing from "./components/Listing";

export default function RecommendationComponent({ userId }) {
  const userInfo = useSelector((state) => state.user);
  const [recommendations, setRecommendations] = useState([]);

  const fetchRecommendations = async () => {
    try {
      const token = userInfo.userInfo.token;
      const response = await fetch("http://localhost:4000/recommendation", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setRecommendations(data.products); // Set recommendations to the products array
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    }
  };

  useEffect(() => {
    fetchRecommendations();
  }, [userId]);

  return (
    <div
      className="visual-search-shop"
      style={{ marginTop: "90px", marginBottom: "90px" }}
    >
      <div className="allproducts__title">
        <h1>Our Top Picks for You</h1>
      </div>
      <div className="product-grid">
        <div className="allproducts__listings">
          <Listing products={recommendations} />
          {recommendations.length === 0 && <p>No products found</p>}
        </div>
      </div>
    </div>
  );
}
