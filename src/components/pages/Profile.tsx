import "./Profile.css";
import { ProfileEdit } from "../utils/Profile/ProfileEdit";
import { ProfileUpload } from "../utils/Profile/ProfileUpload";
import { ProfileHistory } from "../utils/Profile/ProfileHistory";
import UserLoginVerification from "../utils/Helpers/UserLoginVerification";
import { LoadingBeforeLogin } from "../utils/Helpers/LoadingBeforeLogIn";

import { useParams } from "react-router-dom";

export const Profile: React.FC = () => {
  const { category } = useParams();
  const isUserLogin = UserLoginVerification();

  if (isUserLogin.isUserLogin) {
    if (category === "edit") {
      return <ProfileEdit />;
    } else if (category === "upload") {
      return <ProfileUpload />;
    } else if (category === "history") {
      return <ProfileHistory />;
    } else {
      return null;
    }
  } else {
    return <LoadingBeforeLogin />;
  }
};
