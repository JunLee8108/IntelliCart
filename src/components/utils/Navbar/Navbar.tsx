import "./Navbar.css";
import { NavbarModal } from "../Modals/Navbar-modals/NavbarModal";
import { accountSubmenu } from "../Data/data";
import { MouseEvent, useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useLocation } from "react-router-dom";
import { navbarItem } from "../Data/data";

import { Fragment } from "react";

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isClickMobileMenu, clickMobileMenu] = useState(false);
  const [handleMobileModal, setHandleMobileModal] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const user = JSON.parse(sessionStorage.getItem("user") || "null");

  const checkLogin = (e: MouseEvent<HTMLElement>) => {
    if (user) {
      navigate("/");
    } else {
      navigate("/account/login");
    }
  };

  const handleNavbarClick = (index: number, path: string) => {
    setActiveIndex(index);
    navigate(path);
  };

  const handleSubmenu = (content: string) => {
    const contentLowerCase = content.toLocaleLowerCase();
    console.log(contentLowerCase);
    if (contentLowerCase.includes("edit")) {
      navigate("/profile/edit");
    } else if (contentLowerCase.includes("history")) {
      navigate("/profile/history");
    } else if (contentLowerCase.includes("sign out")) {
      let credentials = {
        loading: true,
        user: null,
        error: null,
      };      
      sessionStorage.setItem('user', JSON.stringify(null));
      setActiveIndex(-1);
      navigate("/");
    }

  };

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

  useEffect(() => {
    setActiveIndex(
      navbarItem.findIndex((item) =>
        location.pathname.toLowerCase().includes(item.toLowerCase())
      )
    );
  }, [location.pathname]);

  return (
    <>
      <nav className="navbar display-flex">
        <ul className="navbar-title-flexbox display-flex">
          <li
            className="navbar-title cursor-pointer"
            onClick={() => {
              navigate("/");
              // clearNavbar();
              setActiveIndex(-1);
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
          {handleMobileModal ? (
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
              <Fragment key={index}>
                {navbarItem[index].toLocaleLowerCase() === "account" ? (
                  <>
                    {user ? (
                      <li
                        className={`navbar-item cursor-pointer ${
                          activeIndex === index ? "active" : ""
                        }`}
                      >
                        {user.lastName}

                        <ul className="navbar-submenu">
                          {accountSubmenu.map((content, index) => {
                            return (
                              <li
                                className="navbar-submenu-list"
                                onClick={() => {
                                  handleSubmenu(content);
                                }}
                                key={index}
                              >
                                {content}
                              </li>
                            );
                          })}
                        </ul>
                      </li>
                    ) : (
                      <li
                        className={`navbar-item cursor-pointer ${
                          activeIndex === index ? "active" : ""
                        }`}
                        onClick={(e) => {
                          navigate("/account/login");
                        }}
                      >
                        {navbarItem[index]}
                      </li>
                    )}
                  </>
                ) : (
                  <li
                    className={`navbar-item cursor-pointer ${
                      activeIndex === index ? "active" : ""
                    }`}
                    onClick={() =>
                      handleNavbarClick(index, `/${a.toLowerCase()}`)
                    }
                  >
                    {navbarItem[index]}
                  </li>
                )}
              </Fragment>
            );
          })}
        </ul>
      </nav>

      {isClickMobileMenu ? (
        <NavbarModal
          handleMobileModal={handleMobileModal}
          setHandleMobileModal={setHandleMobileModal}
          checkLogin={checkLogin}
        />
      ) : null}
    </>
  );
};
