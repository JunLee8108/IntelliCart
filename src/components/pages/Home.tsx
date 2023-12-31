import "./Home.css";
import { Chatbot } from "../utils/Helpers/Chatbot";
import { CardData, CardDescription } from "../utils/Data/data";
import UserLoginVerification from "../utils/Helpers/UserLoginVerification";

import { useEffect } from "react";
import React from "react";

import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CircleLoader from "react-spinners/CircleLoader";

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const isUserLogin = UserLoginVerification();

  const hanldeNavigation = () => {
    if (isUserLogin.isUserLogin) {
      navigate("/profile/upload");
    } else {
      navigate("/account/login");
    }
  };

  // For home background animation
  useEffect(() => {
    let count = 0;
    let timer2: ReturnType<typeof setTimeout>;
    const bg1 = document.querySelector<HTMLElement>(".home-top-bg1");
    const bg2 = document.querySelector<HTMLElement>(".home-top-bg2");
    const bg1H1 = document.querySelector<HTMLElement>(".home-top-bg1 h1");
    const bg2H1 = document.querySelector<HTMLElement>(".home-top-bg2 h1");

    let timer = setInterval(() => {
      if (bg1 !== null && bg2 !== null) {
        if (count === 0) {
          bg1.style.opacity = "0";
          bg2.style.opacity = "1";

          if (bg1H1 !== null && bg2H1 !== null) {
            timer2 = setTimeout(() => {
              bg1H1.style.opacity = "0";
              bg1H1.style.animation = "none";
              bg2H1.style.opacity = "1";
              bg2H1.style.animation =
                "typing2 1.5s steps(25), cursor2 1s steps(1) infinite";
            }, 1000);
          }
          count += 1;
        } else if (count === 1) {
          bg1.style.opacity = "1";
          bg2.style.opacity = "0";

          if (bg1H1 !== null && bg2H1 !== null) {
            timer2 = setTimeout(() => {
              bg1H1.style.opacity = "1";
              bg1H1.style.animation =
                "typing 2.2s steps(40), cursor 1s steps(1) infinite";
              bg2H1.style.opacity = "0";
              bg2H1.style.animation = "none";
            }, 1000);
          }
          count -= 1;
        }
      }
    }, 6500);

    return () => {
      clearTimeout(timer);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <>
      <div className="home-container">
        <div className="home-top-bg-container">
          <div className="home-top-bg1 bg-setting display-flex">
            <h1>AI-Powered E-Commerce,</h1>
          </div>
          <div className="home-top-bg2 bg-setting display-flex">
            <h1>IntelliCart.</h1>
          </div>
        </div>

        <div className="home-card-title display-flex">
          <h1>What is IntelliCart?</h1>
          <div className="home-card-title-animation-laptop">
            <CircleLoader
              color="green"
              loading={true}
              size={45}
              speedMultiplier={1}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
          <div className="home-card-title-animation-mobile">
            <CircleLoader
              color="green"
              size={35}
              loading={true}
              speedMultiplier={1}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        </div>

        <div className="home-card-description display-flex">
          <h2>IntelliCart</h2>
          <p className="home-card-description-laptop">
            {CardDescription[0].description}
          </p>
          <p className="home-card-description-mobile">
            {CardDescription[1].description}
          </p>
        </div>

        <div className="home-card-container display-flex">
          {CardData.map((a, index) => {
            return (
              <div className="home-card-flexbox display-flex" key={index}>
                <div className="home-card-flexbox-detail display-flex">
                  <FontAwesomeIcon
                    icon={CardData[index].icon}
                    className="home-card-fontAwesomeIcon"
                  />
                  <h3>{CardData[index].title}</h3>
                  <p>{CardData[index].subtitle}</p>
                </div>
                <div className="home-card-flexbox-detail-hover display-flex">
                  <h3>
                    {CardData[index].title}
                    <FontAwesomeIcon
                      icon={CardData[index].icon}
                      size="xl"
                      style={{ marginLeft: "10px" }}
                    />
                  </h3>
                  <p>{CardData[index].subtitle}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="home-startBtn display-flex">
          <button onClick={hanldeNavigation}>START INTELIICART</button>
        </div>

        <Chatbot />
      </div>
    </>
  );
};
