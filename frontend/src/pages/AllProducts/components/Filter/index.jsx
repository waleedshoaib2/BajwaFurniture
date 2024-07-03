import React from "react";
import Category from "./components/Category";
import Price from "./components/Price";
export default function Filter({ selectedCategories, setSelectedCategories }) {
  return (
    <div className="allproducts__leftPanelFilter">
      <div className="allproducts__leftPanelFilter__title">Filters</div>
      <Category
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
      />
      <Price />
    </div>
  );
}
