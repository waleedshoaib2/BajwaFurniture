import React, { useEffect, useState } from "react";
import Filter from "./components/Filter";

import Listing from "./components/Listing";
import { useSearchParams } from "react-router-dom";
import Meta from "../../components/Meta";
import Paginate from "../../components/Paginate/index.jsx";
import { useDispatch, useSelector } from "react-redux";
import { getProductList } from "../../redux/action/apiProductList.js";
import { LazyLoadImage } from "react-lazy-load-image-component";

export default function AllProducts() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search");
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");
  const [selectedCategories, setSelectedCategories] = useState([]); // State for selected categories

  const { productListInfo } = productList;

  useEffect(() => {
    // Call getProductList with selected categories
    getProductList(
      dispatch,
      searchQuery,
      minPrice,
      maxPrice,
      selectedCategories
    );
  }, [dispatch, searchQuery, minPrice, maxPrice, selectedCategories]);

  return (
    <div className="allproducts">
      {searchQuery ? (
        <div className="allproducts__title__search">
          <Meta title={searchQuery} />
          <div>Show Search Result:</div>
          <div>{searchQuery}</div>
        </div>
      ) : (
        <div className="allproducts__title">
          <Meta title="All Products" />
          <h1>Our Products</h1>
          <LazyLoadImage
            wrapperClassName="allproducts__title__image"
            alt={"recommend_product"}
            effect="blur"
            src="https://images.pexels.com/photos/1534924/pexels-photo-1534924.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            placeholderSrc="https://images.pexels.com/photos/1534924/pexels-photo-1534924.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          />
        </div>
      )}

      <div className="allproducts__listings">
        <div className="allproducts__leftPanelFilter__container">
          {/* Pass setSelectedCategories to Filter component */}
          <Filter
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
          />
        </div>
        <Listing products={productListInfo.products} />
      </div>
    </div>
  );
}
