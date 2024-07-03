import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaUser, FaSearch } from "react-icons/fa"; // Import FaSearch
import "./AdminChat.css";

const AdminChatList = ({ onChatSelect }) => {
  const [chats, setChats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userInfo } = useSelector((state) => state.user);
  const [searchQuery, setSearchQuery] = useState("");
  const [clickedChatId, setClickedChatId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChats = async () => {
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };

      try {
        const response = await axios.get(
          "http://localhost:4000/chat/chats",
          config
        );
        setChats(response.data);
        console.log(response.data);
      } catch (err) {
        setError(err);
        if (err.response && err.response.status === 401) {
          navigate("/login");
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchChats();
  }, [navigate, userInfo.token]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleChatItemClick = (chatId, username, sender) => {
    setClickedChatId(chatId);
    onChatSelect(chatId, username, sender);
  };

  const filteredChats = chats.filter((chat) =>
    chat.user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <section className="message-area-chatlist">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h1 className="chat-header"> Chats </h1>
              <div className="search-bar">
                <div className="search-input">
                  <span className="search-icon">
                    <FaSearch />
                  </span>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="search-input-field"
                  />
                </div>
              </div>
              <div className="chatlist">
                <ul className="chat-list">
                  {filteredChats.map((chat) => (
                    <li
                      key={chat._id}
                      className={`chat-item ${
                        chat._id === clickedChatId ? "clicked" : ""
                      }`}
                      onClick={() =>
                        handleChatItemClick(
                          chat._id,
                          chat.user.name,
                          chat.user._id
                        )
                      }
                    >
                      <div>
                        <div className="flex-shrink-0">
                          <div className="uppercorner">
                            <div className="user-avatar">
                              <FaUser />
                            </div>
                            <div className="username">{chat.user.name}</div>
                            <span className="active"></span>
                          </div>
                        </div>
                        <div className="flex-grow-1 ms-3">
                          <p>
                            Last Message:{" "}
                            {chat.messages[chat.messages.length - 1].content}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AdminChatList;
