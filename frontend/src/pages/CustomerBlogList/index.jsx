import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./CustomerBlogList.css";

export default function CustomerBlogList() {
  const navigate = useNavigate();
  const [pending, setPending] = useState(true);
  const [error, setError] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchBlogs = async (page) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/blogs/posts?page=${page}`
      );
      setBlogs(response.data.posts);
      setTotalPages(response.data.totalPages);
      setPending(false);
    } catch (error) {
      setPending(false);
      setError(error.response.data.message || "Error fetching blogs");
    }
  };

  useEffect(() => {
    fetchBlogs(page);
  }, [page]);

  const handleBlogClick = (blogId) => {
    navigate(`/blog/${blogId}`);
  };

  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handlePrevPage = () => {
    setPage(page - 1);
  };

  return (
    <div>
      <div className="banner">
        <h1>Your Guide to Modern Furniture</h1>
      </div>
      <div className="customer-blog-list">
        <div className="blog-card-grid">
          {pending && <div>Loading...</div>}
          {error && <div>{error}</div>}
          {!pending &&
            blogs.map((blog) => (
              <div
                className="blog-card"
                key={blog._id}
                onClick={() => handleBlogClick(blog._id)}
              >
                <img
                  src={blog.image || "/placeholder-blog.jpg"}
                  alt={blog.title}
                  className="blog-card__image"
                />
                <div className="blog-card__title">{blog.title}</div>
              </div>
            ))}
        </div>
        <div className="pagination">
          <button onClick={handlePrevPage} disabled={page === 1}>
            Previous
          </button>
          <span>
            {page} of {totalPages}
          </span>
          <button onClick={handleNextPage} disabled={page === totalPages}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
