import "./Shop.css";

import PropagateLoader from "react-spinners/PropagateLoader";

export const Shop: React.FC = () => {
  return (
    <>
      <div className="shop-container">
        <h1>Please Sign In First to Use IntelliCart.</h1>
        <div className="shop-loader-laptop">
          <PropagateLoader
            color="black"
            loading={true}
            size={18}
            speedMultiplier={0.5}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
        <div className="shop-loader-mobile">
          <PropagateLoader
            color="black"
            loading={true}
            size={12}
            speedMultiplier={0.5}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      </div>
    </>
  );
};
