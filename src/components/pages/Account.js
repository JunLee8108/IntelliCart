import "./Account.css";

import { Register } from "../utils/Account/Register";
import { ForgotPassword } from "../utils/Account/ForgotPassword";
import { useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import React from "react";
import {AppDispatch} from "../../store";

import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import {loginUser} from '../../features/userSlice';
import {Home} from './Home';

export const Account: React.FC = () => {
  const { category } = useParams();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {loading, error} = useSelector((state: any) => state.user);
  const user = JSON.parse(sessionStorage.getItem('user') || 'null');
  const dispatch = useDispatch();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    let userCredentials={
      email, password
    }
    dispatch(loginUser(userCredentials)).then((result: any) => {
      if(result.payload){
        setEmail('');
        setPassword('');
      }
      window.location.reload();
    });
  }

  if (category === "login" && !user) {
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
                <button type="submit">
                  {loading?'Loading..' : "LOGIN"}
                </button>
                {error&&(
                  <div className='alert alert-danger' role='alert'>{error}</div>
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
      </>
    );
  } else if (category === "login" && user){
    return <Home />;
  } else if (category === "register") {
    return <Register />;
  } else if (category === "forgot-password") {
    return <ForgotPassword />;
  } else {
    return null;
  }
};
