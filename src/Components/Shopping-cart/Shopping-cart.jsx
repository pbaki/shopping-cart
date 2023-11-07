import { Link } from "react-router-dom";
import "./Shopping-cart.css";
import Navigation from "../Navigation/Navigation";
import { useState, useEffect } from "react";

export default function ShoppingCart({ APIData, data, updatedDataRemove }) {
  console.log(data);

  return (
    <div className="shoppingCartPage">
      <Navigation />
      {data.length > 0 ? (
        <CartWithItems products={data} updatedDataRemove={updatedDataRemove} />
      ) : (
        <EmptyCart />
      )}
    </div>
  );
}
function CartWithItems({ products, updatedDataRemove }) {
  const [cartProducts, setCartProducts] = useState(products);
  function displayProducts() {
    let productJSX = cartProducts.map((product) => {
      return (
        <div className="cartProduct" key={product.id}>
          <button
            className="removeFromCart"
            onClick={() => {
              const removed = cartProducts.filter((item) => {
                return item.id !== product.id;
              });
              updatedDataRemove(removed);
              setCartProducts(removed);
            }}
          >
            X
          </button>
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
