import "./Cart.css";

import PropagateLoader from "react-spinners/PropagateLoader";

export const Cart: React.FC = () => {
  return (
    <>
      <div className="cart-container">
        <h1>Please Sign In First to Use IntelliCart.</h1>
        <div className="cart-loader-laptop">
          <PropagateLoader
            color="black"
            loading={true}
            size={18}
            speedMultiplier={0.6}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
        <div className="cart-loader-mobile">
          <PropagateLoader
            color="black"
            loading={true}
            size={12}
            speedMultiplier={0.6}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      </div>
    </>
  );
};
