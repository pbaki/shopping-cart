import { Link } from "react-router-dom";
import "./Shopping-cart.css";
import Navigation from "../Navigation/Navigation";
import { useState, useEffect } from "react";

function DataTransfer({ data }) {
  const [dataObjects, setDataObjects] = useState([]);
  if (data) {
    console.log(data);
  }

  console.log(dataObjects);
}

export default function ShoppingCart({ APIData }) {
  function getData(data) {
    console.log("I got data " + data);
  }
  return (
    <div className="shoppingCartPage">
      <Navigation />
      <EmptyCart />
      <DataTransfer />
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
export { DataTransfer };
