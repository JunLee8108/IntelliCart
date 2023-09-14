import "./Account.css";
import { Register } from "../utils/Account/Register";
import { ForgotPassword } from "../utils/Account/ForgotPassword";

import { useParams, useNavigate } from "react-router-dom";

export const Account: React.FC = () => {
  const { category } = useParams();
  const navigate = useNavigate();

  if (category === "login") {
    return (
      <>
        <div className="account-container">
          <div className="login display-flex">
            <div className="login-logo"></div>
            <div className="login-form">
              <form>
                <label htmlFor="loginID">
                  <p>ID</p>
                </label>
                <input type="text" id="loginID"></input>
                <label htmlFor="loginPW">
                  <p>Password</p>
                </label>
                <input type="password" id="loginPW"></input>
                <p
                  className="login-forgort-password"
                  onClick={() => {
                    navigate("/account/forgot-password");
                  }}
                >
                  Forgot your password?
                </p>
                <button type="submit">LOGIN</button>
                <p className="line">OR</p>
                <p className="login-register">
                  <span
                    className="underline"
                    onClick={() => {
                      navigate("/account/register");
                    }}
                  >
                    Register
                  </span>{" "}
                  now to discover IntelliCart
                </p>
              </form>
            </div>
          </div>
        </div>
      </>
    );
  } else if (category === "register") {
    return <Register />;
  } else if (category === "forgot-password") {
    return <ForgotPassword />;
  } else {
    return null;
  }
};
