import "./NavbarModal.css";
import { navbarItem } from "../Data/data";

import { useNavigate } from "react-router-dom";

interface Props {
  clickMobileMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

export const NavbarModal: React.FC<Props> = ({ clickMobileMenu }) => {
  const navigate = useNavigate();

  return (
    <>
      <div>
        <div
          className="navbar-modal-bg"
          onClick={(e) => {
            const target = document.querySelector(".navbar-modal-bg");
            if (e.target === target) {
              clickMobileMenu(false);
            }
          }}
        >
          <div className="navbar-modal-container">
            {navbarItem.map((a, index) => {
              return (
                <li
                  onClick={() => {
                    navigate(`/${navbarItem[index].toLocaleLowerCase()}`);
                    clickMobileMenu(false);
                  }}
                  key={index}
                >
                  {navbarItem[index]}
                </li>
              );
            })}
            <li>SEARCH</li>
          </div>
        </div>
      </div>
    </>
  );
};
