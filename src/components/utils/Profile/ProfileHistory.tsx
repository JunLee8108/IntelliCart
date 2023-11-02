import "./ProfileHistory.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClockRotateLeft } from "@fortawesome/free-solid-svg-icons";

export const ProfileHistory: React.FC = () => {
  return (
    <>
      <div className="profile-history-container">
        <h2 className="profile-history-header">
          Check Your IntelliCart History{" "}
          <FontAwesomeIcon
            icon={faClockRotateLeft}
            style={{ marginLeft: "5px" }}
            color="gray"
            className="profile-history-icon"
          />
        </h2>
      </div>
    </>
  );
};
