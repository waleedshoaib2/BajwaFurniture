import {
  updateProductStart,
  updateProductSuccess,
  updateProductFailed,
  productListReset,
} from "../slices/productListSlice";
import axios from "axios";
export const getProductList = async (
  dispatch,
  search = "",
  minPriceQuery = "",
  maxPriceQuery = "",
  categories = [] // Include categories parameter
) => {
  if (search === null) {
    search = "";
  }

  console.log("in get product list ", search);
  dispatch(productListReset());
  dispatch(updateProductStart());

  try {
    // Convert categories array to comma-separated string
    const categoriesQuery = categories.join(",");

    const result = await axios.get(
      `http://localhost:4000/product/CustomerGetProduct/?search=${search}` +
        `&minPriceQuery=${minPriceQuery}` +
        `&maxPriceQuery=${maxPriceQuery}` +
        `&categories=${categoriesQuery}` // Add categories to the query
    );

    dispatch(updateProductSuccess(result.data));
    console.log(result.data);
  } catch (error) {
    dispatch(
      updateProductFailed(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};
