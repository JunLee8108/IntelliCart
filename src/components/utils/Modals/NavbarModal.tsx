import "./NavbarModal.css";
import { navbarItem } from "../Data/data";

import { useNavigate } from "react-router-dom";

interface Props {
  handleMobileModal: boolean;
  setHandleMobileModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const NavbarModal: React.FC<Props> = ({
  handleMobileModal,
  setHandleMobileModal,
}) => {
  const navigate = useNavigate();

  return (
    <>
      <div>
        <div
          className={
            handleMobileModal
              ? "navbar-modal-bg animated-bg"
              : "navbar-modal-bg animated-bg-hide"
          }
          onClick={(e) => {
            const target = document.querySelector(".navbar-modal-bg");
            if (e.target === target) {
              setHandleMobileModal(false);
              document.body.style.overflow = "unset";
            }
          }}
        >
          <div
            className={
              handleMobileModal
                ? "navbar-modal-container animated"
                : "navbar-modal-container animated-hide"
            }
          >
            {navbarItem.map((a, index) => {
              return (
                <li
                  onClick={() => {
                    navigate(`/${navbarItem[index].toLocaleLowerCase()}`);
                    setHandleMobileModal(false);
                    document.body.style.overflow = "unset";
                  }}
                  key={index}
                >
                  {navbarItem[index]}
                </li>
              );
            })}
            <li>SEARCH</li>
          </div>
        </div>
      </div>
    </>
  );
};
