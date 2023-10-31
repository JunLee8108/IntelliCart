import "./NavbarModal.css";
import { navbarItem } from "../../Data/data";

import { Fragment } from "react";

import { useNavigate } from "react-router-dom";

interface Props {
  handleMobileModal: boolean;
  setHandleMobileModal: React.Dispatch<React.SetStateAction<boolean>>;
  checkLogin: Function;
}

export const NavbarModal: React.FC<Props> = ({
  handleMobileModal,
  setHandleMobileModal,
  checkLogin,
}) => {
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem("user") || "null");

  return (
    <>
      <div>
        <div
          className={
            handleMobileModal
              ? "navbar-modal-bg animated-bg"
              : "navbar-modal-bg animated-hide"
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
                <Fragment key={index}>
                  {navbarItem[index].toLocaleLowerCase() === "account" ? (
                    <li
                      className="navbar-item cursor-pointer"
                      onClick={(e) => {
                        checkLogin();
                        setHandleMobileModal(false);
                        document.body.style.overflow = "unset";
                      }}
                    >
                      {user ? user.lastName : navbarItem[index]}
                    </li>
                  ) : (
                    <li
                      className="navbar-item cursor-pointer"
                      onClick={(e) => {
                        navigate(`/${navbarItem[index].toLocaleLowerCase()}`);
                        setHandleMobileModal(false);
                        document.body.style.overflow = "unset";
                      }}
                    >
                      {navbarItem[index]}
                    </li>
                  )}
                </Fragment>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
