import "./Loading.css";

import HashLoader from "react-spinners/HashLoader";

export const Loading: React.FC = () => {
  return (
    <>
      <div className="loading-container-bg">
        <div className="loading-container">
          <HashLoader color="#39ff14" />
        </div>
      </div>
    </>
  );
};
