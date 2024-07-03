import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ModalBody from "./ModalBody";
import axios from "axios";
import { FaUpload, FaSearch } from "react-icons/fa";
import HeaderIcon from "../Header/HeaderIcon";
import { useSelector } from "react-redux";

export default function SearchModal({ openModal, setOpenModal }) {
  const navigate = useNavigate();
  const [searchProduct, setSearchProduct] = useState("");
  const [file, setFile] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const userInfo = useSelector((state) => state.user);

  useEffect(() => {
    if (searchResults && searchResults.length > 0) {
      console.log("the data is of ", searchResults);
      setOpenModal(false);
      navigate("/visualsearchshop", {
        state: { visualproduct: searchResults },
      });
    }
  }, [searchResults, navigate]);

  const handleSearchInput = (e) => {
    e.preventDefault();
    setOpenModal(false);
    if (searchProduct) {
      console.log(searchProduct);
      navigate(`/shop?search=${searchProduct}`);
    }
  };

  const handleRedirect = (url) => {
    setOpenModal(false);
    navigate(url);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUploadImage = async () => {
    console.log("in here");
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/api/search",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const response2 = await axios.post(
        "http://localhost:4000/product/getProductsByProductNos",
        response.data
      );

      console.log("the result is ", response2.data);
      setSearchResults(response2.data.products);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div>
      <ModalBody open={openModal}>
        <>
          <form className="search-modal__header" onSubmit={handleSearchInput}>
            <input
              value={searchProduct}
              onChange={(e) => setSearchProduct(e.target.value)}
            />
            <div style={{ display: "flex", alignItems: "center" }}>
              {/* Icon for selecting a file */}
              <label htmlFor="file-upload" style={{ cursor: "pointer" }}>
                <img
                  src="data:image/png;base64,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"
                  alt="Upload"
                  style={{
                    marginRight: "5px",
                    width: "30px",
                    height: "30px",
                    marginTop: "8px",
                  }} // Adjust margin if needed
                />
                <input
                  id="file-upload"
                  type="file"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />
              </label>

              <HeaderIcon
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7rpZ20Y3zUVZgWUL1BxNrYM20S_Zu8YDnXQ&s"
                onClick={handleUploadImage}
              />

              <img
                className="icon-medium margin-inline-end-36"
                src="https://d2c0vv5h4nuw6w.cloudfront.net/icons/close.png"
                alt="close_modal"
                onClick={() => setOpenModal(false)}
              />

              {/* Search icon */}
            </div>
          </form>
          <div className="search-modal__body">
            <h1>Popular Search</h1>
            <div className="search-modal__popular-search">
              <div onClick={() => handleRedirect("/shop?search=chair")}>
                Chair
              </div>
              <div onClick={() => handleRedirect("/shop?search=lamp")}>
                Lamp
              </div>
              <div onClick={() => handleRedirect("/shop?search=bench")}>
                Bed
              </div>
              <div onClick={() => handleRedirect("/shop?search=table%20decor")}>
                Table
              </div>
              <div onClick={() => handleRedirect("/shop?search=table%20decor")}>
                Sofa
              </div>
            </div>
          </div>

          <div>
            <h2>Search Results:</h2>
            <ul>
              {searchResults.map((product) => (
                <li key={product._id}>{product.name}</li>
              ))}
            </ul>
          </div>
        </>
      </ModalBody>
    </div>
  );
}
