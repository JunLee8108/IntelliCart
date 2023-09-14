import "./Navbar.css";
import { NavbarModal } from "../Modals/NavbarModal";
import { MouseEvent, useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useLocation } from "react-router-dom";
import { navbarItem } from "../Data/data";

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isClickMobileMenu, clickMobileMenu] = useState(false);
  const [handleMobileModal, setHandleMobileModal] = useState(false);

  const clearNavbar = () => {
    const handleLi = document.querySelectorAll<HTMLElement>(".navbar-item");
    for (let i = 0; i < handleLi.length; i++) {
      handleLi[i].style.color = "black";
    }
  };

  const handleNavbar = (e: MouseEvent<HTMLElement>) => {
    clearNavbar();
    e.currentTarget.style.color = "orange";
  };

  useEffect(() => {
    const accurateLocation = location.pathname.substring(1);
    const handleLi = document.querySelectorAll<HTMLElement>(".navbar-item");
    for (let i = 0; i < handleLi.length; i++) {
      if (accurateLocation === handleLi[i].innerHTML.toLocaleLowerCase()) {
        handleLi[i].style.color = "orange";
      } else {
        handleLi[i].style.color = "black";
      }
    }
  }, [location.pathname]);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (handleMobileModal) {
      clickMobileMenu(true);
    } else if (!handleMobileModal) {
      timer = setTimeout(() => {
        clickMobileMenu(false);
      }, 300);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [handleMobileModal]);

  return (
    <>
      <nav className="navbar display-flex">
        <ul className="navbar-title-flexbox display-flex">
          <li
            className="navbar-title cursor-pointer"
            onClick={() => {
              navigate("/");
              clearNavbar();
              if (handleMobileModal) {
                setHandleMobileModal(false);
                document.body.style.overflow = "unset";
              }
            }}
          >
            IntelliCart
          </li>
        </ul>

        <ul className="navbar-mobile-menu">
          {isClickMobileMenu ? (
            <button
              onClick={() => {
                setHandleMobileModal(false);
                document.body.style.overflow = "unset";
              }}
            >
              <FontAwesomeIcon icon={faCircleXmark} size="xl"></FontAwesomeIcon>
            </button>
          ) : (
            <button
              onClick={() => {
                setHandleMobileModal(true);
                document.body.style.overflow = "hidden";
              }}
            >
              <FontAwesomeIcon icon={faBars} size="lg"></FontAwesomeIcon>
            </button>
          )}
        </ul>

        <ul className="navbar-item-flexbox display-flex">
          {navbarItem.map((a, index) => {
            return (
              <li
                className="navbar-item cursor-pointer"
                onClick={(e) => {
                  navigate(`/${navbarItem[index].toLocaleLowerCase()}`);
                  handleNavbar(e);
                }}
                key={index}
              >
                {navbarItem[index]}
              </li>
            );
          })}
          {/* <li className="navbar-item-search">
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="navbar-magnifying-glass"
            />
            <input
              type="text"
              placeholder="Search.."
              className="navbar-search-input"
            ></input>
          </li> */}
        </ul>
      </nav>

      {isClickMobileMenu ? (
        <NavbarModal
          handleMobileModal={handleMobileModal}
          setHandleMobileModal={setHandleMobileModal}
        />
      ) : null}
    </>
  );
};
