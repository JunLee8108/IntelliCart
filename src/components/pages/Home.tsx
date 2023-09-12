import "./Home.css";
import { data } from "../utils/Data/data";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRobot } from "@fortawesome/free-solid-svg-icons";
import { faImage } from "@fortawesome/free-regular-svg-icons";
import { faMoneyCheckDollar } from "@fortawesome/free-solid-svg-icons";

export const Home: React.FC = () => {
  return (
    <>
      <div className="home-container">
        <div className="home-top-bg display-flex">
          <h1 className="home-top-title">AI-Powered E-Commerce Shopping</h1>
          {/* <h1 className="home-top-subtitle">'IntelliCart'</h1> */}
          {/* <button>Shop</button> */}
        </div>

        <div className="home-card-container display-flex">
          {data.map((a, index) => {
            return (
              <div className="home-card-flexbox display-flex" key={index}>
                <div className="home-card-flexbox-detail display-flex">
                  <FontAwesomeIcon icon={data[index].icon} className="font" />
                  <h3>{data[index].title}</h3>
                  <p>{data[index].subtitle}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
