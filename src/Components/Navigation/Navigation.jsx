import "./Navigation.css";
import { Link } from "react-router-dom";
import CartIcon from "../../Assets/shopping-cart.jsx";

export default function Navigation() {
  return (
    <div className="navContainer">
      <div className="navStoreName">
        <Link className="link StoreName" to="/">
          Store Name
        </Link>
      </div>
      <div className="navItems">
        <Link className="link navHome" to="/">
          Home
        </Link>
        <Link className="link navShop" to="/shop">
          Shop
        </Link>
      </div>
      <div className="navCartPage">
        <Link className="link navCart" to="/shopping-cart">
          <CartIcon />
        </Link>
      </div>
    </div>
  );
}
