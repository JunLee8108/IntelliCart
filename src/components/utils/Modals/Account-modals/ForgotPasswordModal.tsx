import "./RegisterModal.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareCheck } from "@fortawesome/free-solid-svg-icons";

interface Props {
  setSuccess: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ForgotPasswordModal: React.FC<Props> = ({ setSuccess }) => {
  const [fade, setFade] = useState("");

  const navigate = useNavigate();

  const closeModalandNavigate = () => {
    setSuccess(false);
    navigate("/account/login");
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
              icon={faSquareCheck}
              className="register-modal-success"
            />
            <p>Please check your email to reset your password.</p>
          </div>

          <div className="register-modal-button-container">
            <button onClick={closeModalandNavigate}>CLOSE</button>
          </div>
        </div>
      </div>
    </>
  );
};
