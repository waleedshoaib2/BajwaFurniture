import React, { useState, useEffect } from "react";
import axios from "axios";
import socketIOClient from "socket.io-client";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const ENDPOINT = "http://localhost:4000";

const ChatRoom = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [socket, setSocket] = useState(null);
  let chatId;
  const { userInfo } = useSelector((state) => state.user);
  const [sendId, setSendId] = useState("");

  useEffect(() => {
    const newSocket = socketIOClient(ENDPOINT);
    setSocket(newSocket);
    return () => newSocket.disconnect();
  }, []);

  useEffect(() => {
    const fetchChatId = async () => {
      try {
        const config = {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        };

        const response = await axios.get(
          `http://localhost:4000/chat/chats/me`,
          config
        );

        const chatId = response.data._id;
        console.log("the chat id while fetching ", chatId);
        // setSendId(chatId);
        if (chatId) {
          fetchMessages(chatId);
        } else {
          // Handle case where no chat exists for the user
        }
      } catch (error) {
        // Handle error
      }
    };
    fetchChatId();
  }, [userInfo.token]);

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

  // Automatically scroll to the bottom of the message list when new messages are received
  useEffect(() => {
    const messageContainer = document.getElementById("message-container");
    if (messageContainer) {
      messageContainer.scrollTop = messageContainer.scrollHeight;
    }
  }, [messages]);

  const fetchMessages = async (chatId) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      };

      const response = await axios.get(
        `http://localhost:4000/chat/chats/${chatId}/messages`,
        config
      );

      setMessages(response.data.messages);
      console.log(response.data.messages);
      setSendId(chatId);
    } catch (error) {
      // Handle error
    }
  };

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
        console.log("the id of the chat is ", sendId);

        const response = await axios.post(
          `http://localhost:4000/chat/chats/${sendId}/messages`,
          { content: newMessage },
          config
        );

        console.log("Message sent:", response.data);
        socket.emit("sendMessage", sendId, { content: newMessage });

        setNewMessage("");
      } catch (error) {
        console.error("Message sending error:", error);
      }
    }
  };

  return (
    <div className="container">
      <div className="message-area">
        <div className="chat-area">
          <div className="chatbox">
            <div className="msg-head">
              <h3>Chat Room</h3>
            </div>
            <div className="msg-body">
              <ul>
                {messages.map((message) => (
                  <li
                    key={message._id}
                    className={
                      message.sender === userInfo.id ? "sender" : "receiver"
                    }
                  >
                    <p>{message.content}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="send-box">
              <form onSubmit={handleSubmit} className="my-4">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={!sendId}
                  >
                    Send
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
