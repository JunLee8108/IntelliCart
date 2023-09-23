// Use same css file with RegisterModal.tsx
import "./RegisterModal.css";
import { useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

interface Props {
  setFailed: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ForgotPasswordFailedModal: React.FC<Props> = ({ setFailed }) => {
  const [fade, setFade] = useState("");

  const closeModalandNavigate = () => {
    setFailed(false);
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
            <FontAwesomeIcon
              icon={faTriangleExclamation}
              className="register-modal-warning"
            />
            <p>Your Email doesn't exist!</p>
            <p>Please check with your email.</p>
          </div>

          <div className="register-modal-button-container">
            <button onClick={closeModalandNavigate}>CLOSE</button>
          </div>
        </div>
      </div>
    </>
  );
};
