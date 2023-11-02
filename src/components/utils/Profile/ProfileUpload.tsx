import "./ProfileUpload.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRobot } from "@fortawesome/free-solid-svg-icons";

export const ProfileUpload: React.FC = () => {
  return (
    <>
      <div className="profile-upload-container">
        <h2 className="profile-upload-header">
          Upload Your Image{" "}
          <FontAwesomeIcon
            icon={faRobot}
            style={{ marginLeft: "5px" }}
            color="gray"
            className="profile-upload-icon"
          />
        </h2>
      </div>
    </>
  );
};
