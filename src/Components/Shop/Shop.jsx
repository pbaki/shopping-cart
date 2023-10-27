import { Link } from "react-router-dom";
import "./Shop.css";
import Navigation from "../Navigation/Navigation";
import { useEffect, useState } from "react";

export default function Shop({ APIData }) {
  const [productCategory, setproductCategory] = useState("All");

  function isAPIDataHere(runIfDataHere) {
    return APIData.error !== null ? (
      <div className="errorMsg">APIData.error</div>
    ) : APIData.loading === true ? (
      <div className="Loading">Loading...</div>
    ) : (
      runIfDataHere()
    );
  }

  function generateCards() {
    if (productCategory !== "All") {
      const allProducts = APIData.data.map((product) => {
        if (product.category === productCategory) {
          return (
            <SingleProductCard
              id={product.id}
              key={product.id}
              title={product.title}
              price={product.price}
              rating={product.rating.rate}
              count={product.rating.count}
              image={product.image}
            />
          );
        }
      });
      return allProducts;
    } else if (productCategory === "All") {
      const allProducts = APIData.data.map((product) => {
        return (
          <SingleProductCard
            id={product.id}
            key={product.id}
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
  }
  function categories() {
    let categoryList = [];
    APIData.data.forEach((item) => {
      if (!categoryList.includes(item.category)) {
        categoryList.push(item.category);
      }
    });
    return (
      <select
        name="selectProducts"
        id="selectProducts"
        value={productCategory}
        onChange={(e) => {
          setproductCategory(e.target.value);
        }}
      >
        <option key={0} value="All">
          All
        </option>
        {categoryList.map((item, i) => {
          return (
            <option key={i + 1} value={item}>
              {item}
            </option>
          );
        })}
      </select>
    );
  }

  return (
    <div className="shopPage">
      <Navigation />
      <div className="shopPageContent">
        <h1>Shop</h1>
        <div className="shopPageProductsNavigation">
          <p>Products - </p>
          {isAPIDataHere(categories)}
        </div>
        <div className="shopProducts">{isAPIDataHere(generateCards)}</div>
      </div>
    </div>
  );
}

function SingleProductCard({ id, title, price, rating, count, image }) {
  const [productCount, setProductCount] = useState(1);

  function increaseProductCount() {
    if (productCount < count) {
      setProductCount(productCount + 1);
    }
  }
  function decreaseProductCount() {
    if (productCount > 1) {
      setProductCount(productCount - 1);
    }
  }

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
      <p className="productRating">Rating {rating} / 5</p>
      <p className="productCount">In Stock: {count}</p>
      <div className="addingProductsToCart">
        <div className="howManyItems">
          <div className="minusProduct" onClick={decreaseProductCount}>
            -
          </div>
          <div className="productAddCount">{productCount}</div>
          <div className="plusProduct" onClick={increaseProductCount}>
            +
          </div>
        </div>
        <button className="addProductToCart">Add To cart</button>
      </div>
    </div>
  );
}
