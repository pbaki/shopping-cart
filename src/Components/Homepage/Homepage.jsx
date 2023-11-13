import { Link } from "react-router-dom";
import "./Homepage.css";

export default function Homepage() {
  return (
    <div className="mainPage">
      <div className="homeContent">
        <h1>Welcome To Store Name</h1>
        <p>
          Lorem ipsum dolor sit amet. In velit debitis et eligendi molestiae vel
          dolorem deleniti eum quia consequatur aut saepe dolorum qui inventore
          dolores et maiores excepturi. Eum dolorem beatae id ipsam inventore id
          odit internos aut molestias temporibus ab sint maxime qui quidem
          optio.
        </p>
        <Link className="link" to="/shop/1">
          <button className="shopButton">SHOP NOW</button>
        </Link>
      </div>
    </div>
  );
}
