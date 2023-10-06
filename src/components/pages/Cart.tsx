import "./Cart.css";
import { LoadingBeforeLogin } from "../utils/Helpers/LoadingBeforeLogIn";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMinus,
  faPlus,
  faDeleteLeft,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

export const Cart: React.FC = () => {
  return (
    <>
      {/* <LoadingBeforeLogin /> */}
      <div className="cart-container">
        <h2 className="cart-header">Your Cart</h2>

        <table>
          <tbody>
            <tr>
              <td>
                <img src="/imgs/jeans.jpg" alt="clothes"></img>
              </td>
              <td>
                Amazon Essentials Boys' Regular Straight-Fit Jeans
                <div className="cart-color">Blue</div>
                <div className="cart-size">(Size M)</div>
              </td>
              <td>
                <button className="cart-minusBtn">
                  <FontAwesomeIcon icon={faMinus} />
                </button>
                1
                <button className="cart-plusBtn">
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              </td>
              <td>$123</td>

              <td>
                <button className="cart-deleteBtn">
                  <FontAwesomeIcon icon={faDeleteLeft} />
                </button>
              </td>
            </tr>
            <tr>
              <td></td>
              <td style={{ width: "0%" }}></td>
              <td className="cart-total">Your Total:</td>
              <td>$123</td>
              <td style={{ width: "20%" }}>
                <button>
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};
