import "./Register.css";
import { RegisterModal } from "../Modals/RegisterModal";
import { RegisterFailedModal } from "../Modals/RegisterFailedModal";
import { useState } from "react";
import axios from "axios";

export const Register: React.FC = () => {
  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");
  // const [isEmailSame, setEmailSame] = useState(false);
  // const [isPasswordSame, setPasswordSame] = useState(false);
  const [isSuccessModal, setSuccessModal] = useState(false);
  const [isFailedModal, setFailedModal] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const { data } = await axios.post("/register", {
      email,
      firstname,
      lastname,
      password,
    });

    if (data === "ok") {
      setSuccessModal(true);
    }

    if (data.message === "Username already exists") {
      setFailedModal(true);
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
            <div className="register-input-container">
              <input
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                type="text"
                placeholder="First Name*"
                id="first-name"
                required
              ></input>
              <label htmlFor="first-name">First Name</label>
            </div>

            <div className="register-input-container">
              <input
                type="text"
                placeholder="Last Name*"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                id="last-name"
                required
              ></input>
              <label htmlFor="last-name">Last Name</label>
            </div>

            <div className="register-input-container">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email*"
                id="loginEmail"
                required
              ></input>
              <label htmlFor="loginEmail">Email</label>
            </div>

            <div className="register-input-container">
              <input
                type="email"
                placeholder="Confirm Email*"
                id="loginEmail-confirm"
                // required
              ></input>
              <label htmlFor="loginEmail-confirm">Confirm Email</label>
            </div>

            <div className="register-input-container">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password*"
                id="loginPW"
                required
              ></input>
              <label htmlFor="loginPW">Password</label>
            </div>

            <div className="register-input-container">
              <input
                type="password"
                placeholder="Confirm Password*"
                id="loginPW-confirm"
                // required
              ></input>
              <label htmlFor="loginPW-confirm">Confirm Password</label>
            </div>

            <div className="register-button-container display-flex">
              <div className="register-button-flexbox display-flex">
                <button type="reset" value="Reset">
                  RESET
                </button>
              </div>
              <div className="register-button-flexbox display-flex">
                <button type="submit">CREATE</button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {isSuccessModal ? (
        <RegisterModal setSuccessModal={setSuccessModal} />
      ) : null}

      {isFailedModal ? (
        <RegisterFailedModal setFailedModal={setFailedModal} />
      ) : null}
    </>
  );
};
