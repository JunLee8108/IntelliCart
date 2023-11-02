import { ProfileEdit } from "../utils/Profile/ProfileEdit";
import { ProfileUpload } from "../utils/Profile/ProfileUpload";
import { ProfileHistory } from "../utils/Profile/ProfileHistory";
import UserLoginVerification from "../utils/Helpers/UserLoginVerification";
import { LoadingHeight100 } from "../utils/Helpers/LoadingHeight100";
import { LoadingBeforeLogin } from "../utils/Helpers/LoadingBeforeLogIn";

import { useParams } from "react-router-dom";

export const Profile: React.FC = () => {
  const { category } = useParams();
  const isUserLogin = UserLoginVerification();
  const user = sessionStorage.getItem("user");

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
  } else if (user) {
    return <LoadingHeight100 />;
  } else {
    return <LoadingBeforeLogin />;
  }
};
