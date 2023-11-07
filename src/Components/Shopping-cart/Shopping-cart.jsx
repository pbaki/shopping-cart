import { Link } from "react-router-dom";
import "./Shopping-cart.css";
import Navigation from "../Navigation/Navigation";
import { useState, useEffect } from "react";

export default function ShoppingCart({ APIData, data }) {
  console.log(data);

  return (
    <div className="shoppingCartPage">
      <Navigation />
      {data.length > 0 ? <CartWithItems products={data} /> : <EmptyCart />}
    </div>
  );
}
function CartWithItems({ products }) {
  function displayProducts() {
    const productJSX = products.map((product) => {
      return (
        <div className="cartProduct" key={product.id}>
          <button className="removeFromCart">X</button>
          <div className="productImg">
            <img className="img" src={product.image} alt="Product Image" />
          </div>
          <div className="productInfo">
            <div className="productName">{product.title}</div>
            <div className="quantityPrice">
              <div className="howManyItems">
                <div className="minusProduct">-</div>
                <div className="quantity">{product.quantity}</div>
                <div className="plusProduct">+</div>
              </div>
              <div className="price">{"$ " + product.price}</div>
            </div>
          </div>
        </div>
      );
    });
    return productJSX;
  }
  return (
    <div className="cartItemsCheckout">
      <div className="cartItems">
        {products.length > 0 ? displayProducts() : null}
      </div>
      <div className="checkout"></div>
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
