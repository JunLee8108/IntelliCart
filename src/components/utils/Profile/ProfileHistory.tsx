import "./ProfileHistory.css";
import { LoadingBeforeLogin } from "../Helpers/LoadingBeforeLogIn";

export const ProfileHistory: React.FC = () => {
  const user = JSON.parse(sessionStorage.getItem("user") || "null");

  return (
    <>
      {user ? (
        <div className="profile-history-container">History</div>
      ) : (
        <LoadingBeforeLogin />
      )}
    </>
  );
};
