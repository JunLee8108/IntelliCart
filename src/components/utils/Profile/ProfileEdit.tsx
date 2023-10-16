import "./ProfileEdit.css";
import { LoadingBeforeLogin } from "../Helpers/LoadingBeforeLogIn";

export const ProfileEdit: React.FC = () => {
  const user = JSON.parse(sessionStorage.getItem("user") || "null");
  return (
    <>
      {user ? (
        <div className="profile-edit-container">Edit</div>
      ) : (
        <LoadingBeforeLogin />
      )}
    </>
  );
};
