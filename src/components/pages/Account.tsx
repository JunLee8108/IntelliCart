import "./Account.css";
import {useState, ChangeEvent} from "react";
import axios from "axios";
import React from "react";
export const Account: React.FC = () => {

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault();
      const {data} = await axios.post("/register", {username, password});
  }

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  return (
    <>
      <div className="account-container">
        <div className="login">
          <form onSubmit={handleSubmit}>
            <h2>IntelliCart</h2>
            <label htmlFor="loginID">
              <p>ID</p>
            </label>
            <input value={username}
                   onChange={e => setUsername(e.target.value)}
                   type="text"
                   placeholder="Enter your user ID"
                   id="loginID"></input>
            <label htmlFor="loginPW">
              <p>Password</p>
            </label>
            <input value={password}
                   onChange={e=> setPassword(e.target.value)}
                   placeholder="Enter your password"
                   type="password" id="loginPW"></input>
            <p className="underline">Forgot your password?</p>
            <center>
              <button type="submit" className="cursor-pointer">
                Login
              </button>
            </center>
            <p className="line">Or</p>
            <p>
              <span className="underline">Register</span> now to discover
              IntelliCart.
            </p>
          </form>
        </div>
      </div>
    </>
  );
};
