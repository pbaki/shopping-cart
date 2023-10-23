import { Link } from "react-router-dom";

export default function Homepage() {
  return (
    <div>
      <h2>Homepage</h2>
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
