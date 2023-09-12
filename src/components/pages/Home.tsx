import "./Home.css";
import { CardData } from "../utils/Data/data";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
          {CardData.map((a, index) => {
            return (
              <div className="home-card-flexbox display-flex" key={index}>
                <div className="home-card-flexbox-detail display-flex">
                  <FontAwesomeIcon
                    icon={CardData[index].icon}
                    className="font"
                  />
                  <h3>{CardData[index].title}</h3>
                  <p>{CardData[index].subtitle}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
