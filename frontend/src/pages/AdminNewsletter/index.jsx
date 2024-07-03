import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import AdminSidebar from "../AdminDashboard/AdminSidebar";
import Testing from "../Testing/Testing";

const Newsletter = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userInfo } = useSelector((state) => state.user);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
  const handleSendEmail = async (user_email) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
          "Content-Type": "application/json",
        },
      };

      const response = await axios.post(
        `http://localhost:4000/api/newsletter/email`,
        { user_email },
        config
      );

      // Handle success message
      console.log("Email sent successfully to user:", user_email);
    } catch (error) {
      // Handle error
      console.error("Error sending email:", error);
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
            "Content-Type": "application/json", // Set to JSON
          },
        };
        const response = await axios.get(
          `http://localhost:4000/user/newsletter-subscribed`,
          config
        );
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(error);
      }
    };

    fetchUsers();
  }, [userInfo.token]);

  // Pagination Logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div style={{ display: "flex" }}>
        <Testing />
        <div className="admin-list">
          {loading && <div className="admin-list__container">Loading...</div>}
          {error && (
            <div className="admin-list__container">Error: {error.message}</div>
          )}

          <table
            className="admin-list__container"
            style={{ marginLeft: "20px", borderCollapse: "collapse" }}
          >
            <thead>
              <tr>
                <th
                  style={{
                    padding: "8px",
                    textAlign: "center",
                    verticalAlign: "middle",
                  }}
                >
                  Name
                </th>
                <th
                  style={{
                    padding: "8px",
                    textAlign: "center",
                    verticalAlign: "middle",
                  }}
                >
                  Email
                </th>
                <th
                  style={{
                    padding: "8px",
                    textAlign: "center",
                    verticalAlign: "middle",
                  }}
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {!loading ? (
                currentUsers.length > 0 ? (
                  currentUsers.map((user) => (
                    <tr key={user.id}>
                      <td
                        style={{
                          padding: "8px",
                          textAlign: "center",
                          verticalAlign: "middle",
                        }}
                      >
                        {user.name}
                      </td>
                      <td
                        style={{
                          padding: "8px",
                          textAlign: "center",
                          verticalAlign: "middle",
                        }}
                      >
                        {user.email}
                      </td>
                      <td
                        style={{
                          padding: "8px",
                          textAlign: "center",
                          verticalAlign: "middle",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          <button
                            className="admin-add-button"
                            onClick={() => handleSendEmail(user.email)}
                            style={{
                              padding: "8px 16px",
                              fontSize: "14px",
                              borderRadius: "50px",
                              backgroundColor: "#0069F7",
                              color: "white",
                              border: "none",
                              cursor: "pointer",
                            }}
                          >
                            Send Email
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="3"
                      style={{
                        textAlign: "center",
                        padding: "8px",
                        verticalAlign: "middle",
                      }}
                    >
                      No users found
                    </td>
                  </tr>
                )
              ) : (
                <tr>
                  <td
                    colSpan="3"
                    style={{
                      textAlign: "center",
                      padding: "8px",
                      verticalAlign: "middle",
                    }}
                  >
                    Loading...
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          {/* Pagination */}
          <ul className="pagination">
            {Array.from(
              { length: Math.ceil(users.length / usersPerPage) },
              (_, i) => (
                <li key={i} className="page-item">
                  <a
                    onClick={() => paginate(i + 1)}
                    href="!#"
                    className="page-link"
                  >
                    {i + 1}
                  </a>
                </li>
              )
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Newsletter;
