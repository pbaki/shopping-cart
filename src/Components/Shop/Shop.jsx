import { Link } from "react-router-dom";
import "./Shop.css";
import Navigation from "../Navigation/Navigation";
import { useEffect, useState } from "react";

export default function Shop({ APIData }) {
  const [products, setProducts] = useState(APIData.data);
  console.log(APIData);
  function isAPIDataHere() {
    return APIData.error !== null ? (
      <div className="errorMsg">APIData.error</div>
    ) : APIData.loading === true ? (
      <div className="Loading">Loading...</div>
    ) : (
      generateCards()
    );
  }
  function generateCards(category) {
    //If category selected to write
    //Initial loading All items
    const allProducts = APIData.data.map((product) => {
      return (
        <SingleProductCard
          id={product.id}
          title={product.title}
          price={product.price}
          rating={product.rating.rate}
          count={product.rating.count}
          image={product.image}
        />
      );
    });
    return allProducts;
  }

  return (
    <div className="shopPage">
      <Navigation />
      <div className="shopPageContent">
        <h1>Shop</h1>
        <div className="shopPageProductsNavigation">
          <p>Products - (Selectable Product category)</p>
        </div>
        <div className="shopProducts">{isAPIDataHere()}</div>
      </div>
    </div>
  );
}

function SingleProductCard({ id, title, price, rating, count, image }) {
  return (
    <div className="productCard" key={id}>
      <div className="productImageContainer">
        <img className="productImage" src={image} alt="Product Image" />
      </div>
      <p className="productTitle" style={{ fontSize: "1.1rem" }}>
        {title}
      </p>
      <p className="productPrice" style={{ fontSize: "1.4rem" }}>
        $ {price}
      </p>
      {/* <p className="productRating">Rating {rating} / 5</p> */}
      <p className="productCount">In Stock: {count}</p>
      <div className="addingProductsToCart">
        <div className="howManyItems">
          <div className="minusProduct">-</div>
          <div className="productAddCount">22</div>
          <div className="plusProduct">+</div>
        </div>
        <button className="addProductToCart">Add To cart</button>
      </div>
    </div>
  );
}
