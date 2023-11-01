import { Link } from "react-router-dom";
import "./Shopping-cart.css";
import Navigation from "../Navigation/Navigation";

export default function ShoppingCart({ APIData }) {
  return (
    <div className="shoppingCartPage">
      <Navigation />
      <EmptyCart />
    </div>
  );
}

function EmptyCart() {
  return (
    <div className="emptyCart">
      <p>Cart is empty. Click button below to start shopping.</p>
      <Link className="shopButton" to="/shop/1">
        SHOP NOW
      </Link>
    </div>
  );
}
