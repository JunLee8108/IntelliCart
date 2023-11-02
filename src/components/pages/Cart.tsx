import "./Cart.css";
import { LoadingBeforeLogin } from "../utils/Helpers/LoadingBeforeLogIn";
import UserLoginVerification from "../utils/Helpers/UserLoginVerification";
import { Loading } from "../utils/Helpers/Loading";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMinus,
  faPlus,
  faDeleteLeft,
  faTrash,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";

export const Cart: React.FC = () => {
  const user = sessionStorage.getItem("user");
  const isUserLogin = UserLoginVerification();

  return (
    <>
      {isUserLogin.isUserLogin ? (
        <div className="cart-container">
          <h2 className="cart-header">
            Your Cart{" "}
            <FontAwesomeIcon
              icon={faCartShopping}
              style={{ marginLeft: "5px" }}
              color="gray"
              className="cart-cart-icon"
            />
          </h2>

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
      ) : user ? (
        <div className="cart-container">
          <h2 className="cart-header">
            Your Cart{" "}
            <FontAwesomeIcon
              icon={faCartShopping}
              style={{ marginLeft: "5px" }}
              color="gray"
              className="cart-cart-icon"
            />
          </h2>

          <table>
            <tbody>
              <tr>
                <td>{/* <img src="/imgs/jeans.jpg" alt="clothes"></img> */}</td>
                <td>
                  {/* Amazon Essentials Boys' Regular Straight-Fit Jeans
                  <div className="cart-color">Blue</div>
                  <div className="cart-size">(Size M)</div> */}
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
                <td>{/* $123 */}</td>

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
                <td>${/* 123 */}</td>
                <td style={{ width: "20%" }}>
                  <button>
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        // <Loading />
        <LoadingBeforeLogin />
      )}
    </>
  );
};
