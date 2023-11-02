import "./ProfileEdit.css";

import { useState, useEffect } from "react";

import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

export const ProfileEdit: React.FC = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [userID, setUserID] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      let { data } = await axios.post("/profile/edit", {
        userID,
        firstname,
        lastname,
      });
    } catch (error) {
      alert((error as any).response.data.message);
    }
  };

  useEffect(() => {
    const userVerification = async () => {
      const userData = JSON.parse(sessionStorage.getItem("user") as string);

      const token = userData.token;

      try {
        let { data } = await axios.post("/login-verification", {
          token,
        });
        setFirstname(data.firstname);
        setLastname(data.lastname);
        setUserID(data._id);
      } catch (error) {
        alert("Failed to load user information.");
      }
    };

    userVerification();
  }, []);

  return (
    <>
      <div className="profile-edit-container">
        <h2 className="profile-edit-header">
          Edit Your Profile{" "}
          <FontAwesomeIcon
            icon={faUser}
            style={{ marginLeft: "5px" }}
            color="gray"
            className="profile-edit-icon"
          />
        </h2>
        <div className="profile-edit-form">
          <div className="profile-edit-form-title">
            <h4>{firstname}'s Profile</h4>
            <h2>Modify Your Account</h2>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="profile-edit-input-container">
              <input
                defaultValue={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                type="text"
                placeholder="First Name*"
                id="first-name"
                required
              ></input>
              <label htmlFor="first-name">First Name</label>
            </div>

            <div className="profile-edit-input-container">
              <input
                type="text"
                placeholder="Last Name*"
                defaultValue={lastname}
                onChange={(e) => setLastname(e.target.value)}
                id="last-name"
                required
              ></input>
              <label htmlFor="last-name">Last Name</label>
            </div>

            <div className="profile-edit-button-container display-flex">
              <div className="profile-edit-button-flexbox display-flex">
                <button type="submit">MODIFY</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
