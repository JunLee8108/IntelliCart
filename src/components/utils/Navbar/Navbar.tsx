import "./Navbar.css";

export const Navbar: React.FC = () => {
  return (
    <>
      <nav className="navbar display-flex">
        <ul className="navbar-title-flexbox display-flex">
          <li className="navbar-title cursor-pointer">IntelliCart</li>
        </ul>

        <ul className="navbar-item-flexbox display-flex">
          <li className="navbar-item cursor-pointer">Shop</li>
          <li className="navbar-item cursor-pointer">About</li>
          <li className="navbar-item cursor-pointer">Account</li>
          <li className="navbar-item cursor-pointer">Cart</li>
        </ul>
      </nav>
    </>
  );
};
