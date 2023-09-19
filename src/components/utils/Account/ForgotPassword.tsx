import "./ForgotPassword.css";

export const ForgotPassword: React.FC = () => {
  return (
    <>
      <div className="forgot-password-container display-flex">
        <div className="forgot-password-introduction">
          <p>We will send you an email to update your password.</p>
        </div>
        <div className="forgot-password-form">
          <div className="forgot-password-form-title">
            <h2>Reset Your Password</h2>
          </div>

          <form>
            <div className="forgot-password-input-container">
              <input
                type="email"
                placeholder="Email*"
                id="loginEmail"
                onFocus={() => {
                  console.log(1);
                }}
                required
              ></input>
              <label htmlFor="loginEmail">Email</label>
            </div>
            <div className="forgot-password-input-container">
              <input
                type="email"
                placeholder="Confirm Email*"
                id="loginEmail-confirm"
                required
              ></input>
              <label htmlFor="loginEmail">Confirm Email</label>
            </div>

            <div className="forgot-password-button-container display-flex">
              <div className="forgot-password-button-flexbox display-flex">
                <button type="reset">RESET</button>
              </div>
              <div className="forgot-password-button-flexbox display-flex">
                <button type="submit">SEND</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
