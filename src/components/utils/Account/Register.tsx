import "./Register.css";
import { Loading } from "../Helpers/Loading";
import { RegisterModal } from "../Modals/Account-modals/RegisterModal";
import { useState } from "react";
import axios from "axios";

type errorObject = {
  status?: string;
  message?: string;
};

export const Register: React.FC = () => {
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isEmailSame, setEmailSame] = useState(false);
  const [isPasswordSame, setPasswordSame] = useState(false);
  const [isSuccessModal, setSuccessModal] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [message, setMessage] = useState<errorObject>({});

  const handleConfirm = (a: boolean, b: boolean) => {
    setLoading(false);
    setEmailSame(a);
    setPasswordSame(b);
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);

    // Checking if the email and the confirm email are the same
    if (email !== confirmEmail && password === confirmPassword) {
      return handleConfirm(true, false);
    } else if (email === confirmEmail && password !== confirmPassword) {
      return handleConfirm(false, true);
    } else if (email !== confirmEmail && password !== confirmPassword) {
      return handleConfirm(true, true);
    } else {
      setEmailSame(false);
      setPasswordSame(false);
    }

    try {
      const { data } = await axios.post("/register", {
        email,
        firstname,
        lastname,
        password,
      });
      setMessage(data);
      setSuccessModal(true);
    } catch (error) {
      setMessage((error as any).response.data);
      setSuccessModal(true);
    }

    setLoading(false);
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
                value={confirmEmail}
                onChange={(e) => setConfirmEmail(e.target.value)}
                placeholder="Confirm Email*"
                id="loginEmail-confirm"
                required
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
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password*"
                id="loginPW-confirm"
                required
              ></input>
              <label htmlFor="loginPW-confirm">Confirm Password</label>
            </div>

            {isEmailSame ? (
              <div className="forgot-passoword-email-notmatch">
                <p>Emails are not the same!</p>
              </div>
            ) : null}

            {isPasswordSame ? (
              <div className="forgot-passoword-email-notmatch">
                <p>Passwords are not the same!</p>
              </div>
            ) : null}

            <div className="register-button-container display-flex">
              <div className="register-button-flexbox display-flex">
                <button type="submit">CREATE</button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {isLoading ? <Loading /> : null}

      {isSuccessModal ? (
        <RegisterModal setSuccessModal={setSuccessModal} message={message} />
      ) : null}
    </>
  );
};
