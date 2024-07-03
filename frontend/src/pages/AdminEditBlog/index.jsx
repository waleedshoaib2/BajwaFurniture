import React, { useState, useEffect, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./EditPost.css";
import Testing from "../Testing/Testing";
import { useSelector, useDispatch } from "react-redux";

const EditPost = ({ blogId }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageURL, setImageURL] = useState("");
  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const imageURLRef = useRef(null);
  const params = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/blogs/posts/${params.id}`
        );
        const { title, content, image } = response.data;
        setTitle(title);
        setContent(content);
        setImageURL(image);
      } catch (error) {
        console.error("Error loading blog:", error);
      }
    };

    fetchBlogData();
  }, [blogId]);

  const handleTitleChange = () => setTitle(titleRef.current.value);
  const handleContentChange = (value) => setContent(value);
  const handleImageChange = () => setImageURL(imageURLRef.current.value);
  let { userInfo } = useSelector((state) => state.user);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost:4000/api/blogs/posts/${params.id}`,
        {
          title,
          content,
          image: imageURL,
        },
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      console.log("Post updated:", response.data);
      navigate(`/getallblogs`);
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <Testing />
      <div className="create-post-container">
        <form onSubmit={handleSubmit} className="create-post-form">
          <div className="form-field">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              placeholder="Enter a captivating title"
              ref={titleRef}
              value={title}
              onChange={handleTitleChange}
            />
          </div>

          <div className="form-field">
            <label htmlFor="content">Content:</label>
            <ReactQuill
              theme="snow"
              id="content"
              value={content}
              onChange={handleContentChange}
              placeholder="Write your thoughts here..."
            />
          </div>

          <div className="form-field">
            <label htmlFor="image-url">Image URL:</label>
            <input
              type="text"
              id="image-url"
              placeholder="Add an image to enhance your post"
              ref={imageURLRef}
              value={imageURL}
              onChange={handleImageChange}
            />
          </div>

          <button type="submit" className="publish-button">
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditPost;
