import { Link } from "react-router-dom";

export default function ShoppingCart() {
  return (
    <div>
      <h2>Shopping Cart Page</h2>
      <Link className="link" to="/">
        Homepage
      </Link>
      <Link className="link" to="/shop">
        Shop
      </Link>
      <Link className="link" to="/shopping-cart">
        Shopping-cart
      </Link>
    </div>
  );
}
