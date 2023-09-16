import "./Cart.css";

export const Cart: React.FC = () => {
  return (
    <>
      <div className="cart-container">
        <div className="cart-title">
          <h3>Your Cart</h3>
        </div>

        <div className="cart-table">
          <table></table>
        </div>
      </div>
    </>
  );
};
