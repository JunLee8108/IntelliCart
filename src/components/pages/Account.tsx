import "./Account.css";
import { useState } from "react";
import axios from "axios";
import React from "react";

import "./Account.css";
import { useContext } from "react";
import { Register } from "../utils/Account/Register";
import { ForgotPassword } from "../utils/Account/ForgotPassword";

import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext.jsx";

export const Account: React.FC = () => {
  const { category } = useParams();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const { data } = await axios.post("/login", { email, password });
  }

  if (category === "login") {
    return (
      <>
        <div className="account-container">
          <div className="login display-flex">
            <div className="login-logo"></div>
            <div className="login-form">
              <form onSubmit={handleSubmit}>
                <label htmlFor="loginEmail">
                  <p>Email</p>
                </label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="Email*"
                  id="loginEmail"
                  required
                ></input>
                <label htmlFor="loginPW">
                  <p>Password</p>
                </label>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password*"
                  type="password"
                  id="loginPW"
                  required
                ></input>
                <p
                  className="login-forgort-password"
                  onClick={() => {
                    navigate("/account/forgot-password");
                  }}
                >
                  Forgot your password?
                </p>
                <button type="submit">LOGIN</button>
                <p className="line">OR</p>
                <p className="login-register">
                  <span
                    className="underline"
                    onClick={() => {
                      navigate("/account/register");
                    }}
                  >
                    Register
                  </span>{" "}
                  now to discover IntelliCart
                </p>
              </form>
            </div>
          </div>
        </div>
      </>
    );
  } else if (category === "register") {
    return <Register />;
  } else if (category === "forgot-password") {
    return <ForgotPassword />;
  } else {
    return null;
  }
};
