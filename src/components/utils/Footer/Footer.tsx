import "./Footer.css";
import { navbarItem } from "../Data/data";

import { useNavigate } from "react-router-dom";

export const Footer: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <footer className="footer display-flex">
        <ul className="footer-flexbox1 display-flex">
          <h2>IntelliCart.</h2>
          <div className="border-line"></div>
          <p>2023 IntelliCart | All Rights Reserved</p>
        </ul>

        <ul className="footer-flexbox2 display-flex">
          {navbarItem.map((a, index) => {
            return (
              <li
                onClick={() => {
                  if (navbarItem[index].toLocaleLowerCase() === "account") {
                    navigate(`/${navbarItem[index].toLocaleLowerCase()}/login`);
                  } else {
                    navigate(`/${navbarItem[index].toLocaleLowerCase()}`);
                  }
                }}
                key={index}
              >
                {navbarItem[index]}
              </li>
            );
          })}
        </ul>
      </footer>
    </>
  );
};
