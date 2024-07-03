import React from "react";
import { useDispatch, useSelector } from "react-redux";
import getProductDetail from "../../redux/action/apiProductDetail";
import { useParams } from "react-router-dom";
import Ratings from "../../components/Ratings";
import Meta from "../../components/Meta";
import DisplayPending from "../../components/DisplayPending";
import Alert from "@mui/material/Alert";
import AddCart from "./AddCart";
import WriteComments from "./WriteComments";
import SeeComments from "./SeeComments";

export default function ProductPage() {
  const dispatch = useDispatch();
  const params = useParams();

  const productDetail = useSelector((state) => state.productDetail);
  console.log(productDetail);

  const { pending, error, errorMessage, productInfo } = productDetail;
  const [count, setCount] = React.useState(1);
  const userInfo = useSelector((state) => state.user);

  // Function to update user interactions and searches
  const updateUserInteractions = async () => {
    if (userInfo && !userInfo.isAdmin) {
      const token = userInfo.userInfo.token;
      console.log(token);
      const requestBody = {
        productId: params.id,
      };
      console.log(requestBody);
      console.log(userInfo);
      try {
        const response = await fetch(
          "http://localhost:4000/api/userinteraction/user/interactions",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // Include the token in the Authorization header
            },
            body: JSON.stringify(requestBody),
          }
        );
        if (response.ok) {
          console.log("User interactions updated successfully");
        } else {
          console.error("Failed to update user interactions");
        }
      } catch (error) {
        console.error("Error updating user interactions:", error);
      }
    }
  };

  React.useEffect(() => {
    window.scrollTo(0, 0);
    getProductDetail(params.id, dispatch);
    updateUserInteractions(); // Call updateUserInteractions when component mounts
  }, [dispatch, params.id]);
  return (
    <div>
      <Meta title={productInfo.name} />
      {pending ? (
        <DisplayPending pending={pending} />
      ) : error ? (
        <Alert severity="error">{errorMessage}</Alert>
      ) : (
        <div className="productDetailPage">
          <img
            className="productDetailPage__mainImg shadow-4D"
            src={productInfo.image}
            alt="product_images"
          />

          <div className="product_detail_descriptions">
            <div className="product_detail_title">{productInfo.name}</div>
            <div className="product_detail_rating">
              <Ratings product={productInfo} />
            </div>

            <AddCart
              productInfo={productInfo}
              count={count}
              setCount={setCount}
            />

            <div className="productDetailPage__description">
              <h1>Description:</h1>
              <p>{productInfo.description}</p>
            </div>

            <WriteComments productInfo={productInfo} params={params} />
            <SeeComments productInfo={productInfo} />
          </div>
        </div>
      )}
    </div>
  );
}
