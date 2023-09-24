import "./EmailVerification.css";
import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import PropagateLoader from "react-spinners/PropagateLoader";

export const EmailVerification: React.FC = () => {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    const timerFunction = (a: string) => {
      timer = setTimeout(() => {
        alert(a);
        navigate("/account/login");
      }, 300);
    };

    const verifyEmail = async () => {
      try {
        await axios.get(`/verify-email/${token}`);
        // Navigate to a success page or show a success message
        timerFunction("Your email was verified!");
      } catch (error: any) {
        if (
          error.response &&
          error.response.data.message === "Verification link has expired"
        ) {
          // Navigate to an expired link page or show an expired link message
          timerFunction("Verification Link was expired!");
        } else {
          // Navigate to a general error page or show a general error message
          timerFunction("Verification failed!");
        }
      }
    };

    verifyEmail();

    return () => {
      clearTimeout(timer);
    };
  }, [token, navigate]);

  return (
    <div className="email-verificatioin-container">
      <PropagateLoader
        color="#36D7B7"
        loading={true}
        size={30}
        speedMultiplier={0.8}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};
