import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { logout } from "../../redux/action/apiUserAction";
import DisplayPending from "../../components/DisplayPending";
import Alert from "@mui/material/Alert";
import "./BlogList.css";
import AdminSidebar from "../AdminDashboard/AdminSidebar";
import Testing from "../Testing/Testing";

export default function AdminGetBlogList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [pending, setPending] = useState(true);
  const [error, setError] = useState();
  const { userInfo } = useSelector((state) => state.user);
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/blogs/posts");
      setBlogs(response.data.posts);
      console.log(response.data.posts);
      setPending(false);
    } catch (error) {
      setPending(false);
      if (error.response.status === 401) {
        dispatch(logout());
      } else {
        setError(error.response.data.message);
      }
    }
  };

  const deleteBlog = async (blogID) => {
    try {
      const response = await axios.delete(
        `http://localhost:4000/api/blogs/posts/${blogID}`,
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      console.log(response.data);
      fetchBlogs();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = (blogID) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      deleteBlog(blogID);
    }
  };

  const handleView = (blogID) => {
    navigate(`/blog/${blogID}`);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <>
      <div style={{ display: "flex" }}>
        <Testing />

        <div className="admin-list">
          <DisplayPending pending={pending} />
          <div className="admin-list__container">
            {error && <Alert severity="error">{error}</Alert>}
            <div
              className="admin-add-button"
              onClick={() => {
                window.scrollTo(0, 0);
                navigate("/createpost");
              }}
            >
              Add New Blog
            </div>
            <table>
              <thead>
                <tr>
                  <th scope="col">Title</th>
                  <th scope="col">Edit/Delete</th>
                  <th scope="col">View</th>{" "}
                </tr>
              </thead>
              <tbody>
                {blogs.map((blog) => (
                  <tr key={blog._id}>
                    <td>{blog.title}</td>
                    <td>
                      <img
                        src="https://d2c0vv5h4nuw6w.cloudfront.net/icons/edit.png"
                        alt="edit_icon"
                        onClick={() => {
                          window.scrollTo(0, 0);
                          navigate(`/editblog/${blog._id}`);
                        }}
                      />
                      <img
                        onClick={() => handleDelete(blog._id)}
                        src="https://d2c0vv5h4nuw6w.cloudfront.net/icons/delete.png"
                        alt="delete_icon"
                      />
                    </td>
                    <td
                      className="admin-add-button"
                      style={{ marginLeft: "20px" }} // Add left margin of 20px
                      onClick={() => handleView(blog._id)}
                    >
                      View
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
