import "./RegisterModal.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquareCheck,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";

type errorObject = {
  status?: string;
  message?: string;
};

interface Props {
  setSuccessModal: React.Dispatch<React.SetStateAction<boolean>>;
  message: errorObject;
}

export const RegisterModal: React.FC<Props> = ({
  setSuccessModal,
  message,
}) => {
  const [fade, setFade] = useState("");

  const navigate = useNavigate();

  const closeModalandNavigate = () => {
    setSuccessModal(false);
    if (message.status !== "error") {
      navigate("/account/login");
    }
  };

  useEffect(() => {
    let timer = setTimeout(() => {
      setFade("register-modal-container-fade");
    }, 200);

    return () => {
      clearTimeout(timer);
      setFade("");
    };
  }, []);

  return (
    <>
      <div
        className="register-modal-bg"
        onClick={(e) => {
          const target = document.querySelector(".register-modal-bg");
          if (target === e.target) {
            closeModalandNavigate();
          }
        }}
      >
        <div className={"register-modal-container " + fade}>
          <div className="register-modal-logo-container">
            <h3>IntelliCart</h3>
          </div>

          <div className="register-modal-text-container">
            {message.status === "error" ? (
              <>
                <FontAwesomeIcon
                  icon={faTriangleExclamation}
                  className="register-modal-warning"
                />
                {message.message ===
                "Failed to send a verfication email to you" ? (
                  <p>{message.message}</p>
                ) : (
                  <>
                    <p>Your Email already exists!</p>
                    <p>Please try again with a different email.</p>
                  </>
                )}
              </>
            ) : (
              <>
                <FontAwesomeIcon
                  icon={faSquareCheck}
                  className="register-modal-success"
                />
                <p>Succesfully registered!</p>
                <p>Check your email and verificate your account.</p>
              </>
            )}
          </div>

          <div className="register-modal-button-container">
            <button onClick={closeModalandNavigate}>CLOSE</button>
          </div>
        </div>
      </div>
    </>
  );
};
