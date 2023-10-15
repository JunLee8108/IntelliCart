import React from "react";

export const Profile: React.FC = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  return(
    <div>{user ? user.lastName : "Account"}</div>
  )
}
