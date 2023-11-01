import "./ProfileEdit.css";

import { useState, useEffect } from "react";

import axios from "axios";

export const ProfileEdit: React.FC = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [isEmailSame, setEmailSame] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check if the emails are the same
    if (email !== confirmEmail) {
      return setEmailSame(true);
    }

    try {
      let { data } = await axios.post("/profile/edit", {
        email,
        firstname,
        lastname,
      });
    } catch (error) {}
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
        setEmail(data.email);
      } catch (error) {
        alert("Failed to load user information.");
      }
    };

    userVerification();
  }, []);

  return (
    <>
      <div className="profile-edit-container">
        <div className="profile-edit-introduction">
          <p>
            Personalize and update your information to make your online
            experience truly yours.
          </p>
        </div>
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

            <div className="profile-edit-input-container">
              <input
                type="email"
                defaultValue={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email*"
                id="loginEmail"
                required
              ></input>
              <label htmlFor="loginEmail">Email</label>
            </div>

            <div className="profile-edit-input-container">
              <input
                type="email"
                defaultValue={confirmEmail}
                onChange={(e) => setConfirmEmail(e.target.value)}
                placeholder="Confirm Email*"
                id="loginEmail-confirm"
                required
              ></input>
              <label htmlFor="loginEmail-confirm">Confirm Email</label>
            </div>

            {isEmailSame ? (
              <div className="forgot-passoword-email-notmatch">
                <p>Emails are not the same!</p>
              </div>
            ) : null}

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
