import "./Navigation.css";
import { Link } from "react-router-dom";
import CartIcon from "../../Assets/shopping-cart.jsx";
import { useEffect, useState } from "react";

export default function Navigation({ productsInCartQuantity, children }) {
  const [quantity, setQuantity] = useState(null);
  useEffect(() => {
    setQuantity(productsInCartQuantity());
  }, [productsInCartQuantity]);
  return (
    <>
      <nav className="navContainer">
        <div className="navStoreName">
          <Link className="link StoreName" to="/">
            Store Name
          </Link>
        </div>
        <div className="navItems">
          <Link className="link navHome" to="/">
            Home
          </Link>
          <Link className="link navShop" to="/shop/1">
            Shop
          </Link>
        </div>
        <div className="navCartPage">
          <Link className="link navCart" to="/shopping-cart">
            <CartIcon />
          </Link>
          <div className="navCartProductCount">{quantity}</div>
        </div>
      </nav>
      <main className="Content">{children}</main>
    </>
  );
}
