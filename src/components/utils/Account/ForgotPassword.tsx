import "./ForgotPassword.css";
import { ForgotPasswordModal } from "../Modals/Account-modals/ForgotPasswordModal";
import { ForgotPasswordFailedModal } from "../Modals/Account-modals/ForgotPasswordFailedModal";
import { Loading } from "../Helpers/Loading";
import { useState } from "react";

import axios from "axios";

export const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [isEmailSame, setEmailSame] = useState(false);
  const [isFailed, setFailed] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleEmail = () => {
    setLoading(false);
    setEmailSame(true);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    if (email !== confirmEmail) {
      return handleEmail();
    } else {
      setEmailSame(false);
    }

    try {
      const { data } = await axios.post("/forgot-password", {
        email,
      });

      setSuccess(true);
    } catch (error) {
      if (error) {
        const errorMessage = (error as any).response.data.message;
        setErrorMessage(errorMessage);
        setFailed(true);
      }
    }

    setLoading(false);
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
                <button type="submit">SEND</button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {isLoading ? <Loading /> : null}

      {isSuccess ? <ForgotPasswordModal setSuccess={setSuccess} /> : null}

      {isFailed ? (
        <ForgotPasswordFailedModal
          setFailed={setFailed}
          errorMessage={errorMessage}
        />
      ) : null}
    </>
  );
};
