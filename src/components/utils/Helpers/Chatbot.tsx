import "./Chatbot.css";
import { useState, useEffect } from "react";
import React from "react";

import axios from "axios";

type MessageType = {
  type: "user" | "server";
  content: string;
};

export const Chatbot: React.FC = () => {
  const chatContentRef = React.useRef<HTMLDivElement | null>(null);
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [input, setInput] = useState<string>("");

  async function sendMessage() {
    if (input.trim() === "") return;

    // User message
    const userMessage: MessageType = {
      type: "user",
      content: input,
    };
    setMessages((prev) => [...prev, userMessage]);

    // Send user's message and wait for server's reply
    const serverReply = await sendChatData(userMessage);

    if (serverReply) {
      // Append server's reply to the chat
      setTimeout(() => {
        const replyMessage: MessageType = {
          type: "server",
          content: serverReply.text,
        };
        setMessages((prev) => [...prev, replyMessage]);
      }, 500);
    }

    setInput("");
  }

  async function sendChatData(
    userMessage: MessageType
  ): Promise<{ text: string }> {
    try {
      const response = await axios.post("/send-message", { userMessage });
      return response.data;
    } catch (error) {
      console.error("Error sending chat data:", error);
      return { text: "Error communicating with the server." };
    }
  }

  const toggleChat = () => {
    const chatroom = document.querySelector<HTMLElement>(".chat-room");
    const chatBtn = document.querySelector<HTMLElement>(".chat-button");
    const chatInput = document.querySelector<HTMLElement>(
      ".chat-input-section"
    );

    if (chatroom && chatBtn && chatInput) {
      if (chatroom.style.display === "block") {
        chatroom.style.display = "none";
        chatBtn.style.opacity = "0.5";
        chatInput.style.display = "none";
      } else {
        chatroom.style.display = "block";
        chatBtn.style.opacity = "1";
        chatInput.style.display = "block";
      }
    }
  };

  useEffect(() => {
    if (!sessionStorage.hasOwnProperty("chatMessages")) {
      sessionStorage.setItem("chatMessages", JSON.stringify([]));
    } else {
      const chatMessage = JSON.parse(
        sessionStorage.getItem("chatMessages") || "{}"
      );
      setMessages(chatMessage);
    }
  }, []);

  // Automatically scroll to the recent message
  useEffect(() => {
    if (chatContentRef.current) {
      chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight;
    }
    sessionStorage.setItem("chatMessages", JSON.stringify(messages));
  }, [messages]);

  // For home chatroom feature
  useEffect(() => {
    const chatBtn = document.querySelector<HTMLElement>(".chat-button");
    const chatroom = document.querySelector<HTMLElement>(".chat-room");
    const chatInput = document.querySelector<HTMLElement>(
      ".chat-input-section"
    );

    const checkScroll = () => {
      const innerHeightPlusWindowScrollY = window.innerHeight + window.scrollY;
      const bodyOffsetHeight = document.body.offsetHeight;

      // User has scrolled to the bottom
      if (innerHeightPlusWindowScrollY >= bodyOffsetHeight - 5) {
        if (chatBtn && chatInput && chatroom) {
          chatBtn.style.display = "none";
          chatBtn.style.opacity = "0.5";
          chatroom.style.display = "none";
          chatInput.style.display = "none";
        }
      } else {
        if (chatBtn) {
          chatBtn.style.display = "block";
        }
      }

      // Chatroom always closed whenever the scroll is up or down
      // if (chatroom && chatBtn && chatInput) {
      //   chatroom.style.display = "none";
      //   chatBtn.style.opacity = "0.5";
      //   chatInput.style.display = "none";
      // }
    };

    const closeChatOnOutsideClick = (e: MouseEvent) => {
      if (
        !chatroom?.contains(e.target as Node) &&
        !chatBtn?.contains(e.target as Node) &&
        !chatInput?.contains(e.target as Node) &&
        chatroom?.style.display === "block" &&
        chatInput?.style.display === "block"
      ) {
        chatroom.style.display = "none";
        chatInput.style.display = "none";
        if (chatBtn) {
          chatBtn.style.opacity = "0.5";
        }
      }
    };

    window.addEventListener("scroll", checkScroll);
    document.addEventListener("mousedown", closeChatOnOutsideClick);

    return () => {
      window.removeEventListener("scroll", checkScroll);
      document.removeEventListener("mousedown", closeChatOnOutsideClick);
    };
  }, []);

  return (
    <>
      <div className="chat-button" onClick={toggleChat}>
        Chat
      </div>
      <div className="chat-room">
        <div className="chat-header">
          <h4>Do you need help?</h4>
        </div>

        {/* Displaying the chat messages */}
        <div className="chat-content" ref={chatContentRef}>
          {messages
            .slice(0)
            .reverse()
            .map(
              (
                message,
                index // Note the reverse here due to column-reverse in CSS
              ) => (
                <div key={index} className={`chat-message ${message.type}`}>
                  {message.content}
                </div>
              )
            )}
        </div>

        <div className="chat-input-section">
          <input
            type="text"
            placeholder="Type a message..."
            className="chat-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
          />

          <button className="chat-send-button" onClick={sendMessage}>
            SEND
          </button>
        </div>
      </div>
    </>
  );
};
