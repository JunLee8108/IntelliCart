import "./Profile.css";
import { ProfileEdit } from "../utils/Profile/ProfileEdit";
import { ProfileHistory } from "../utils/Profile/ProfileHistory";

import { useParams } from "react-router-dom";

export const Profile: React.FC = () => {
  const { category } = useParams();
  if (category === "edit") {
    return <ProfileEdit />;
  } else if (category === "history") {
    return <ProfileHistory />;
  } else {
    return null;
  }
};
