import "./Register.css";
import {useState} from "react";
import axios from "axios";

import { useNavigate } from 'react-router-dom';

export const Register: React.FC = () => {

  const [email, setEmail] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    const {data} = await axios.post('/register', {email, firstname, lastname, password})
    if (data == "ok"){
      alert("Registered sucesfully. Please login with your email.");
      navigate('/account/login');
    }

  }

  return (
    <>
      <div className="register-container display-flex">
        <div className="register-introduction">
          <p>
            Welcome to IntelliCart, where cutting-edge AI meets the world of
            e-commerce.
          </p>
        </div>
        <div className="register-form">
          <div className="register-form-title">
            <h4>Profile</h4>
            <h2>Create Your Account</h2>
          </div>

          <form onSubmit={handleSubmit}>
            <input value={firstname}
              onChange={e => setFirstname(e.target.value)}
              type="text"
              placeholder="First Name*"
              id="first-name"
              required
            ></input>
            <input
              type="text"
              placeholder="Last Name*"
              value={lastname}
              onChange={e=>setLastname(e.target.value)}
              id="last-name"
              required
            ></input>
            <input
              type="email"
              value={email}
              onChange={e=> setEmail(e.target.value)}
              placeholder="Email*"
              id="loginEmail"
              required
            ></input>
            <input
              type="email"
              placeholder="Confirm Email*"
              id="loginEmail-confirm"
              required
            ></input>
            <input
              type="password"
              value={password}
              onChange={e=> setPassword(e.target.value)}
              placeholder="Password*"
              id="loginPW"
              required
            ></input>
            <input
              type="password"
              placeholder="Confirm Password*"
              id="loginPW-confirm"
              required
            ></input>

            <div className="register-button-container display-flex">
              <div className="register-button-flexbox display-flex">
                <button type="reset">RESET</button>
              </div>
              <div className="register-button-flexbox display-flex">
                <button type="submit">CREATE</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
