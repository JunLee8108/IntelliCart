import "./LoadingHeight100.css";

import HashLoader from "react-spinners/HashLoader";

export const LoadingHeight100: React.FC = () => {
  return (
    <>
      <div className="loading-height-container">
        <HashLoader color="#39ff14" />
      </div>
    </>
  );
};
