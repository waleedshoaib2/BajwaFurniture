import React from "react";
import ProductsPrimary from "../../../../components/ProductsPrimary";

export default function Listing({ visualproduct }) {
  console.log("in lsting", visualproduct);
  return (
    <div className="allproducts__products">
      <div className="allproducts__products__grid">
        {visualproduct?.map((product) => {
          return <ProductsPrimary key={product._id} product={product} />;
        })}
      </div>
    </div>
  );
}
