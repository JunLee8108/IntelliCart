import "./ProfileUpload.css";

import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRobot } from "@fortawesome/free-solid-svg-icons";

export const ProfileUpload: React.FC = () => {
  const [image, setImage] = useState("");
  const [isLoading, setLoading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0];
      setImage(URL.createObjectURL(img));
    }
  };

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

        <div className="profile-upload-input-container">
          <input
            type="file"
            accept=".png,.jpg"
            onChange={handleImageChange}
            id="fileInput"
          />
        </div>

        <div className="profile-upload-img-container">
          {image && (
            <>
              <img src={image} alt="Uploaded" className="uploaded-image" />
              <button className="profile-upload-submit-btn">Submit</button>
            </>
          )}
        </div>
      </div>
    </>
  );
};
