import { useLocation } from "react-router-dom";
import Filter from "./components/Filter";
import Listing from "./components/Listing";

const VisualSearchShop = () => {
  const location = useLocation();
  console.log("Location state:", location.state);
  const visualproduct = location.state?.visualproduct;
  console.log("the product is ", visualproduct);

  return (
    <>
      <h2 style={{ fontSize: "30px" }}>Visual Search results</h2>
      <div className="visual-search-shop" style={{ marginTop: "60px" }}>
        <div className="product-grid" style={{ marginTop: "60px" }}>
          <div className="allproducts__listings" style={{ marginTop: "200px" }}>
            <Listing visualproduct={visualproduct} />
            {visualproduct && visualproduct.length > 0 ? (
              visualproduct.map((product, index) => <div key={index}></div>)
            ) : (
              <p>No products found</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default VisualSearchShop;
