import "./Register.css";

export const Register: React.FC = () => {
  return (
    <>
      <div className="register-container display-flex">
        <div className="register-introduction">
          <p>
            Welcome to IntelliCart, where cutting-edge AI meets the world of
            e-commerce.
          </p>
        </div>
        <div className="register-form">
          <div className="register-form-title">
            <h4>Profile</h4>
            <h2>Create Your Account</h2>
          </div>

          <form>
            <input
              type="text"
              placeholder="First Name*"
              id="first-name"
              required
            ></input>
            <input
              type="text"
              placeholder="Last Name*"
              id="last-name"
              required
            ></input>
            <input
              type="email"
              placeholder="Email*"
              id="loginEmail"
              required
            ></input>
            <input
              type="email"
              placeholder="Confirm Email*"
              id="loginEmail-confirm"
              required
            ></input>
            <input
              type="password"
              placeholder="Password*"
              id="loginPW"
              required
            ></input>
            <input
              type="password"
              placeholder="Confirm Password*"
              id="loginPW-confirm"
              required
            ></input>

            <div className="register-button-container display-flex">
              <div className="register-button-flexbox display-flex">
                <button type="reset">RESET</button>
              </div>
              <div className="register-button-flexbox display-flex">
                <button type="submit">CREATE</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
