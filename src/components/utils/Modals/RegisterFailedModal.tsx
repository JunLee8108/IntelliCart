// Use same css file with RegisterModal.tsx
import "./RegisterModal";
import { useEffect, useState } from "react";

interface Props {
  setFailedModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const RegisterFailedModal: React.FC<Props> = ({ setFailedModal }) => {
  const [fade, setFade] = useState("");

  const closeModalandNavigate = () => {
    setFailedModal(false);
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
            <p>Your Email already exists!</p>
            <p>Please try again with a different email.</p>
          </div>

          <div className="register-modal-button-container">
            <button onClick={closeModalandNavigate}>CLOSE</button>
          </div>
        </div>
      </div>
    </>
  );
};
