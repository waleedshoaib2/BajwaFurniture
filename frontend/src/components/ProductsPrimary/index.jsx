import React from "react";
import Ratings from "../Ratings";
import { useNavigate } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";

export default function ProductsPrimary({ product }) {
  const navigate = useNavigate();

  // Determine whether to include decimal places based on the price
  const includeDecimal = product.price > 1000000;

  // Format price with commas and optional decimal places
  const formattedPrice = product.price.toLocaleString(undefined, {
    minimumFractionDigits: includeDecimal ? 2 : 0,
    maximumFractionDigits: includeDecimal ? 2 : 0,
  });

  return (
    <div
      className="productCard_primary"
      onClick={() => navigate(`/product/${product._id}`)}
    >
      <LazyLoadImage
        width="100%"
        height="75%"
        src={product.images}
        placeholderSrc={product.image}
      />
      <h1>{product.name}</h1>

      {/* Display formatted price */}
      <h2>Rupees {formattedPrice}</h2>
    </div>
  );
}
