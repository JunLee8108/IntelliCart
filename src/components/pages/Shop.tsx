import "./Shop.css";
import { LoadingBeforeLogin } from "../utils/Helpers/LoadingBeforeLogIn";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShop } from "@fortawesome/free-solid-svg-icons";

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
          {/* <div className="shop-list-item">a</div>
          <div className="shop-list-item">a</div> 
          <div className="shop-list-item">a</div>
          <div className="shop-list-item">a</div> */}
        </div>
      </div>
    </>
  );
};
