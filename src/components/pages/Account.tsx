import "./Account.css";

import { Register } from "../utils/Account/Register";
import { ForgotPassword } from "../utils/Account/ForgotPassword";
import { Loading } from "../utils/Helpers/Loading";
import { loginUser } from "../../features/userSlice";
import { AppDispatch } from "./store.js";

import React from "react";
import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

export const Account: React.FC = () => {
  const { category } = useParams();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);
  const { loading, error } = useSelector((state: any) => state.user);

  const dispatch = useDispatch<AppDispatch>();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    let userCredentials = {
      email,
      password,
    };
    dispatch(loginUser(userCredentials)).then((result: any) => {
      if (result.payload.message === "User doesn't exist") {
        alert("Invalid Email!");
      } else if (result.payload.message === "Invalid password") {
        alert("Invalid Password!");
      } else {
        setEmail("");
        setPassword("");
        setLoading(true);
        const timer = setTimeout(() => {
          navigate("/", { replace: true });
        }, 1000);
      }
    });
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
                <button type="submit">{loading ? "Loading.." : "LOGIN"}</button>
                {error && (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                )}
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

        {isLoading ? <Loading /> : null}
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
