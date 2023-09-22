import "./EmailVerification.css";
import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export const EmailVerification: React.FC = () => {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        await axios.get(`/verify-email/${token}`);
        // Navigate to a success page or show a success message
        alert("Your Email was verified!");
        navigate("/account/login");
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
    <div className="email-verificatioin-container">
      <h1>Verifying your email...</h1>
    </div>
  );
};
