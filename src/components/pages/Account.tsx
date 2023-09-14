import "./Account.css";

export const Account: React.FC = () => {
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
              <p className="login-forgort-password">Forgot your password?</p>
              <button type="submit">LOGIN</button>
              <p className="line">OR</p>
              <p className="login-register">
                <span className="underline">Register</span> now to discover
                IntelliCart
              </p>
            </form>
          </div>
        </div>
        {/* <div className="login">
          <form>
            <h2>IntelliCart</h2>
            <label htmlFor="loginID">
              <p>ID</p>
            </label>
            <input type="text" id="loginID"></input>
            <label htmlFor="loginPW">
              <p>Password</p>
            </label>
            <input type="password" id="loginPW"></input>
            <p className="underline">Forgot your password?</p>
            <center>
              <button type="submit" className="cursor-pointer">
                Login
              </button>
            </center>
            <p className="line">Or</p>
            <p>
              <span className="underline">Register</span> now to discover
              IntelliCart.
            </p>
          </form>
        </div> */}
      </div>
    </>
  );
};
