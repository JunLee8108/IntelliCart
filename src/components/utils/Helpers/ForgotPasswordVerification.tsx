import "./ForgotPasswordVerification.css";
import "../Account/ForgotPassword.css";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Loading } from "./Loading";

import PropagateLoader from "react-spinners/PropagateLoader";

export const ForgotPasswordVerification: React.FC = () => {
  const [isVerified, setVerified] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordSame, setPasswordSame] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setPasswordSame(true);
    }

    setLoading(true);

    try {
      const { data } = await axios.post(`/reset-password/${token}`, {
        password,
      });

      alert(data.message);
      navigate("/account/login", { replace: true });
    } catch (error) {
      if (error) {
        const errorMessage = (error as any).response.data.message;
        alert(errorMessage);
      }
    }

    setLoading(false);
  };

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const data = await axios.get(`/reset-password/${token}`);
        // Navigate to a success page or show a success message
        alert("Your email was verified!");
        setVerified(true);
      } catch (error: any) {
        if (
          error.response &&
          error.response.data.message === "Verification link has expired"
        ) {
          // Navigate to an expired link page or show an expired link message
          alert("Verification Link was expired!");
          navigate("/account/login");
        } else {
          // Navigate to a general error page or show a general error message
          alert("Verification failed!");
          navigate("/account/login");
        }
      }
    };

    verifyEmail();
  }, [token, navigate]);

  return (
    <>
      {isVerified ? (
        <div className="forgot-password-container display-flex">
          <div className="forgot-password-introduction">
            <p>IntelliCart</p>
          </div>
          <div className="forgot-password-form">
            <div className="forgot-password-form-title">
              <h2>Reset Your Password</h2>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="forgot-password-input-container">
                <input
                  type="password"
                  value={password}
                  placeholder="Password*"
                  id="loginPassword"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                ></input>
                <label htmlFor="loginPassword">Password</label>
              </div>
              <div className="forgot-password-input-container">
                <input
                  type="password"
                  value={confirmPassword}
                  placeholder="Confirm Password*"
                  id="loginPassword-confirm"
                  required
                  onChange={(e) => setConfirmPassword(e.target.value)}
                ></input>
                <label htmlFor="loginPassword-confirm">Confirm Password</label>
              </div>

              {isPasswordSame ? (
                <div className="forgot-passoword-email-notmatch">
                  <p>Passwords are not the same!</p>
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
      ) : (
        <div className="forgot-password-verificatioin-container">
          <PropagateLoader
            color="#36D7B7"
            loading={true}
            size={30}
            speedMultiplier={0.8}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      )}

      {isLoading ? <Loading /> : null}
    </>
  );
};
