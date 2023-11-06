import { Link } from "react-router-dom";
import "./Shopping-cart.css";
import Navigation from "../Navigation/Navigation";
import { useState, useEffect } from "react";

export default function ShoppingCart({ APIData, data }) {
  console.log(data);

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
