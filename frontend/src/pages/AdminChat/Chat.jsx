import React, { useState, useEffect } from "react";
import axios from "axios";
import socketIOClient from "socket.io-client";
import { useSelector } from "react-redux";
import "./Chat.css"; // Import the provided CSS styling

const ENDPOINT = "http://localhost:4000";

const Chat = ({ chatId, username, sender }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [socket, setSocket] = useState(null);
  const { userInfo } = useSelector((state) => state.user);
  console.log(sender);
  useEffect(() => {
    const newSocket = socketIOClient(ENDPOINT);
    setSocket(newSocket);
    return () => newSocket.disconnect();
  }, []);

  useEffect(() => {
    const fetchMessages = async () => {
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };

      try {
        const response = await axios.get(
          `http://localhost:4000/chat/chats/${chatId}/messages`,
          config
        );

        setMessages(response.data.messages);
      } catch (error) {
        // handle error
      }
    };
    fetchMessages();
  }, [chatId, userInfo.token]);

  useEffect(() => {
    if (socket) {
      socket.on("connect", () => {
        socket.emit("joinChat", chatId);
      });
      socket.on("newMessage", (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });
    }
    return () => {
      if (socket) {
        socket.off("newMessage");
      }
    };
  }, [socket, chatId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newMessage) {
      try {
        const config = {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        };

        const response = await axios.post(
          `http://localhost:4000/chat/chats/${chatId}/messages`,
          { content: newMessage },
          config
        );

        console.log("Message sent:", response.data);
        socket.emit("sendMessage", chatId, { content: newMessage });

        setNewMessage("");
      } catch (error) {
        console.error("Message sending error:", error);
      }
    }
  };

  return (
    <div className="message-area">
      <div className="chat-area">
        <div className="msg-head">
          <h3>{username}</h3>
        </div>
        <div className="chatbox">
          <div className="msg-body">
            {messages.map((message) => (
              <ul key={message._id} className="chat-list">
                <li
                  className={message.sender === sender ? "sender" : "receiver"}
                >
                  <p>{message.content}</p>
                </li>
              </ul>
            ))}
          </div>
        </div>
        <div className="send-box">
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Type your message here..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <button type="submit" className="btn btn-primary">
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;
