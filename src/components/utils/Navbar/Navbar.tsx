import "./Navbar.css";

//

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

export const Navbar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <nav className="navbar display-flex">
        <ul className="navbar-title-flexbox display-flex">
          <li
            className="navbar-title cursor-pointer"
            onClick={() => {
              navigate("/");
            }}
          >
            IntelliCart
          </li>
        </ul>

        <ul className="navbar-item-flexbox display-flex">
          <li className="navbar-item cursor-pointer">Shop</li>
          <li
            className="navbar-item cursor-pointer"
            onClick={() => {
              navigate("/account");
            }}
          >
            Account
          </li>
          <li className="navbar-item cursor-pointer">Cart</li>
          <li className="navbar-item cursor-pointer">About</li>
          <li className="navbar-item-search">
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="navbar-magnifying-glass"
            />
            <input
              type="text"
              placeholder="Search.."
              className="navbar-search-input"
            ></input>
          </li>
        </ul>
      </nav>
    </>
  );
};
