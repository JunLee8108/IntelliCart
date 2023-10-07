import "./Shop.css";
import { shopData } from "../utils/Data/data";
import { LoadingBeforeLogin } from "../utils/Helpers/LoadingBeforeLogIn";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShop,
  faStar,
  faStarHalfStroke,
} from "@fortawesome/free-solid-svg-icons";

export const Shop: React.FC = () => {
  return (
    <>
      {/* <LoadingBeforeLogin /> */}
      <div className="shop-container">
        <h2 className="shop-header">
          Shop Products{" "}
          <FontAwesomeIcon
            icon={faShop}
            style={{ marginLeft: "5px" }}
            color="gray"
            className="cart-cart-icon"
          />
        </h2>

        <div className="shop-list">
          {shopData.map((content, index) => {
            const displayStar = () => {
              let countStar: number | undefined = undefined;
              let countHalfStar: number | undefined = undefined;
              let array = [];

              if (content.rating > 0.0 && content.rating < 1.0) {
                countStar = 0;
                countHalfStar = 1;
              } else if (content.rating >= 1.0 && content.rating < 1.5) {
                countStar = 1;
                countHalfStar = 0;
              } else if (content.rating >= 1.5 && content.rating < 2) {
                countStar = 1;
                countHalfStar = 1;
              } else if (content.rating >= 2 && content.rating < 2.5) {
                countStar = 2;
                countHalfStar = 0;
              } else if (content.rating >= 2.5 && content.rating < 3) {
                countStar = 2;
                countHalfStar = 1;
              } else if (content.rating >= 3 && content.rating < 3.5) {
                countStar = 3;
                countHalfStar = 0;
              } else if (content.rating >= 3.5 && content.rating < 4) {
                countStar = 3;
                countHalfStar = 1;
              } else if (content.rating >= 4 && content.rating < 4.5) {
                countStar = 4;
                countHalfStar = 0;
              } else if (content.rating >= 4.5 && content.rating < 4.8) {
                countStar = 4;
                countHalfStar = 1;
              } else if (content.rating >= 4.8) {
                countStar = 5;
                countHalfStar = 0;
              } else if (content.rating === 0.0) {
                countStar = 0;
                countHalfStar = 0;
              }

              if (countStar !== undefined) {
                for (let i = 0; i < countStar; i++) {
                  array.push(<FontAwesomeIcon icon={faStar} color="#FFA242" />);
                }
              }

              if (countHalfStar !== undefined) {
                for (let j = 0; j < countHalfStar; j++) {
                  array.push(
                    <FontAwesomeIcon icon={faStarHalfStroke} color="#FFA242" />
                  );
                }
              }

              return array;
            };

            return (
              <div className="shop-list-item" key={index}>
                <div className="shop-list-item-img">
                  <img src={content.img} alt=""></img>
                </div>
                <div className="shop-list-item-detail">
                  <h3>{content.brand}</h3>
                  <p className="shop-list-item-deatil-title">{content.title}</p>
                  <p className="shop-list-item-detail-review">
                    {displayStar()}
                    &nbsp;
                    {content.reviews.toLocaleString("en-US")}
                  </p>
                  <p className="shop-list-item-detail-price">
                    ${content.price}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
