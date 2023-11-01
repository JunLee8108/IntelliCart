import { useEffect, useState } from "react";

import axios from "axios";

export default function UserLoginVerification() {
  const [isUserLogin, setUserLogin] = useState(false);

  useEffect(() => {
    const userVerification = async () => {
      const userData = JSON.parse(sessionStorage.getItem("user") as string);

      if (!userData) {
        return setUserLogin(false);
      }

      const token = userData.token;

      try {
        let { data } = await axios.post("/login-verification", {
          token,
        });
        setUserLogin(true);
      } catch (error) {
        setUserLogin(false);
      }
    };

    userVerification();
  }, []);

  return { isUserLogin };
}
