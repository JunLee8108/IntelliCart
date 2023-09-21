import "./Home.css";
import { CardData } from "../utils/Data/data";
import { useEffect, useState, useRef } from "react";
import React from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type MessageType = {
  type: "user" | "server";
  content: string;
};

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [replyMessage, setReplyMessage] = useState<string>("");
  const [input, setInput] = useState<string>("");

  const chatContentRef = React.useRef<HTMLDivElement | null>(null);

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

  // For home background animation
  useEffect(() => {
    let count = 0;
    let timer2: ReturnType<typeof setTimeout>;
    const bg1 = document.querySelector<HTMLElement>(".home-top-bg1");
    const bg2 = document.querySelector<HTMLElement>(".home-top-bg2");
    const bg1H1 = document.querySelector<HTMLElement>(".home-top-bg1 h1");
    const bg2H1 = document.querySelector<HTMLElement>(".home-top-bg2 h1");

    let timer = setInterval(() => {
      if (bg1 !== null && bg2 !== null) {
        if (count === 0) {
          bg1.style.opacity = "0";
          bg2.style.opacity = "1";

          if (bg1H1 !== null && bg2H1 !== null) {
            timer2 = setTimeout(() => {
              bg1H1.style.opacity = "0";
              bg1H1.style.animation = "none";
              bg2H1.style.opacity = "1";
              bg2H1.style.animation =
                "typing2 1.5s steps(25), cursor2 1s steps(1) infinite";
            }, 1000);
          }
          count += 1;
        } else if (count === 1) {
          bg1.style.opacity = "1";
          bg2.style.opacity = "0";

          if (bg1H1 !== null && bg2H1 !== null) {
            timer2 = setTimeout(() => {
              bg1H1.style.opacity = "1";
              bg1H1.style.animation =
                "typing 2.2s steps(40), cursor 1s steps(1) infinite";
              bg2H1.style.opacity = "0";
              bg2H1.style.animation = "none";
            }, 1000);
          }
          count -= 1;
        }
      }
    }, 6500);

    return () => {
      clearTimeout(timer);
      clearTimeout(timer2);
    };
  }, []);

  /************** Return **************/
  return (
    <>
      <div className="home-container">
        <div className="home-top-bg-container">
          <div className="home-top-bg1 bg-setting display-flex">
            <h1>AI-Powered E-Commerce, </h1>
          </div>
          <div className="home-top-bg2 bg-setting display-flex">
            <h1>IntelliCart.</h1>
          </div>
        </div>

        <div className="home-card-title display-flex">
          <h1>What is IntelliCart?</h1>
        </div>

        <div className="home-card-description display-flex">
          <h2>IntelliCart</h2>
          <p className="home-card-description-laptop">
            We've seamlessly integrated the latest in machine learning
            technology to provide a personalized, efficient, and futuristic
            shopping experience. Whether you're looking for product
            recommendations tailored just for you, voice-activated searches, or
            real-time customer service through our intelligent chatbot,
            IntelliCart is designed to transform how you shop online. Our
            platform isn't just about buying — it's about experiencing. Upload
            images, and our advanced image recognition system will find products
            matching your style. With augmented reality try-ons and dynamic
            pricing that ensures you always get the best deal, we aim to make
            every step of your shopping journey intuitive and enjoyable.
          </p>
          <p className="home-card-description-mobile">
            Our platform isn't just about buying — it's about experiencing.
            Upload images, and our advanced image recognition system will find
            products matching your style. With augmented reality try-ons and
            dynamic pricing that ensures you always get the best deal, we aim to
            make every step of your shopping journey intuitive and enjoyable.
          </p>
        </div>

        <div className="home-card-container display-flex">
          {CardData.map((a, index) => {
            return (
              <div className="home-card-flexbox display-flex" key={index}>
                <div className="home-card-flexbox-detail display-flex">
                  <FontAwesomeIcon
                    icon={CardData[index].icon}
                    className="home-card-fontAwesomeIcon"
                  />
                  <h3>{CardData[index].title}</h3>
                  <p>{CardData[index].subtitle}</p>
                </div>
                <div className="home-card-flexbox-detail-hover display-flex">
                  <h3>
                    {CardData[index].title}
                    <FontAwesomeIcon
                      icon={CardData[index].icon}
                      size="xl"
                      style={{ marginLeft: "10px" }}
                    />
                  </h3>
                  <p>{CardData[index].subtitle}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="home-startBtn display-flex">
          <button
            onClick={() => {
              navigate("/account/login");
            }}
          >
            START INTELIICART
          </button>
        </div>

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
            Send
          </button>
        </div>
      </div>
    </>
  );
};
