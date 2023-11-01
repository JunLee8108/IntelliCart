import "./Navbar.css";
import { NavbarModal } from "../Modals/Navbar-modals/NavbarModal";
import { accountSubmenu } from "../Data/data";
import { navbarItem } from "../Data/data";

import { MouseEvent, useEffect, useState } from "react";
import { Fragment } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isClickMobileMenu, clickMobileMenu] = useState(false);
  const [handleMobileModal, setHandleMobileModal] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isUserLogin, setUserLogin] = useState(false);
  const [userLastName, setUserLastName] = useState("");

  const checkLogin = (e: MouseEvent<HTMLElement>) => {
    if (isUserLogin) {
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

    if (contentLowerCase.includes("edit")) {
      navigate("/profile/edit");
    } else if (contentLowerCase.includes("history")) {
      navigate("/profile/history");
    } else if (contentLowerCase.includes("upload")) {
      navigate("/profile/upload");
    } else if (contentLowerCase.includes("sign out")) {
      let credentials = {
        loading: true,
        user: null,
        error: null,
      };
      sessionStorage.removeItem("user");
      setActiveIndex(-1);
      navigate("/");
      navigate(0);
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

    const userVerification = async () => {
      const userData = JSON.parse(sessionStorage.getItem("user") as string);

      if (!userData) {
        return setUserLogin(false);
      }

      const token = userData.token;

      try {
        let { data } = await axios.post("/login-verification", {
          token,
        });
        setUserLogin(true);
        setUserLastName(data.lastname);
      } catch (error) {
        alert("Invalid Token!");
        setUserLogin(false);
        sessionStorage.removeItem("user");
        setActiveIndex(-1);
        navigate("/");
        navigate(0);
      }
    };

    userVerification();
  }, [location.pathname]);

  return (
    <>
      <nav className="navbar display-flex">
        <ul className="navbar-title-flexbox display-flex">
          <li
            className="navbar-title cursor-pointer"
            onClick={() => {
              navigate("/");
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
                    {isUserLogin ? (
                      <li
                        className={`navbar-item cursor-pointer ${
                          activeIndex === index ? "active" : ""
                        }`}
                      >
                        {userLastName}

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
