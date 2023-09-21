import "./ForgotPassword.css";
import { ForgotPasswordFailedModal } from "../Modals/Account-modals/ForgotPasswordFailedModal";
import { useState } from "react";
import axios from "axios";

export const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [isEmailSame, setEmailSame] = useState(false);
  const [isFailed, setFailed] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (email !== confirmEmail) {
      return setEmailSame(true);
    } else {
      setEmailSame(false);
    }

    try {
      const { data } = await axios.post("/forgot-password", {
        email,
      });

      // Debug
      console.log(data.message);

      if (data.message === "Username doesn't exists") {
        return setFailed(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="forgot-password-container display-flex">
        <div className="forgot-password-introduction">
          <p>We will send you an email to update your password.</p>
        </div>
        <div className="forgot-password-form">
          <div className="forgot-password-form-title">
            <h2>Reset Your Password</h2>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="forgot-password-input-container">
              <input
                type="email"
                value={email}
                placeholder="Email*"
                id="loginEmail"
                required
                onChange={(e) => setEmail(e.target.value)}
              ></input>
              <label htmlFor="loginEmail">Email</label>
            </div>
            <div className="forgot-password-input-container">
              <input
                type="email"
                value={confirmEmail}
                placeholder="Confirm Email*"
                id="loginEmail-confirm"
                required
                onChange={(e) => setConfirmEmail(e.target.value)}
              ></input>
              <label htmlFor="loginEmail-confirm">Confirm Email</label>
            </div>

            {isEmailSame ? (
              <div className="forgot-passoword-email-notmatch">
                <p>Emails are not the same!</p>
              </div>
            ) : null}

            <div className="forgot-password-button-container display-flex">
              <div className="forgot-password-button-flexbox display-flex">
                <button type="reset">RESET</button>
              </div>
              <div className="forgot-password-button-flexbox display-flex">
                <button type="submit">SEND</button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {isFailed ? <ForgotPasswordFailedModal setFailed={setFailed} /> : null}
    </>
  );
};
