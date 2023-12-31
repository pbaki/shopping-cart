import { Link } from "react-router-dom";
import "./Shopping-cart.css";
import { useState, useEffect } from "react";

export default function ShoppingCart({
  title,
  data,
  updatedData,
  updateQuantity,
}) {
  useEffect(() => {
    document.title = title;
  }, [title]);
  return (
    <div className="shoppingCartPage">
      {data.length > 0 ? (
        <CartWithItems
          products={data}
          updatedData={updatedData}
          updateQuantity={updateQuantity}
        />
      ) : (
        <EmptyCart />
      )}
    </div>
  );
}
function CartWithItems({ products, updatedData }) {
  const [cartProducts, setCartProducts] = useState(products);

  const totalPrice = cartProducts
    .reduce((total, product) => total + product.price * product.quantity, 0)
    .toFixed(2);

  function increaseProductCount(id) {
    const updatedCartProducts = cartProducts.map((item) => {
      if (item.id === id && item.quantity < item.totalCount) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }
      return item;
    });
    updatedData(updatedCartProducts);
    setCartProducts(updatedCartProducts);
  }

  function decreaseProductCount(id) {
    const updatedCartProducts = cartProducts.map((item) => {
      if (item.id === id && item.quantity > 1) {
        return {
          ...item,
          quantity: item.quantity - 1,
        };
      }
      return item;
    });
    updatedData(updatedCartProducts);
    setCartProducts(updatedCartProducts);
  }

  function displayProducts() {
    let productJSX = cartProducts.map((product) => {
      return (
        <div className="cartProduct" key={product.id}>
          <button
            className="removeFromCart"
            aria-label="Delete product"
            onClick={() => {
              const removed = cartProducts.filter((item) => {
                return item.id !== product.id;
              });
              updatedData(removed);
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
                <button
                  className="minusProduct"
                  onClick={() => {
                    decreaseProductCount(product.id);
                  }}
                  aria-label="Subtract product"
                >
                  -
                </button>

                <div className="quantity">{product.quantity}</div>

                <button
                  className="plusProduct"
                  onClick={() => {
                    increaseProductCount(product.id);
                  }}
                  aria-label="Add product"
                >
                  +
                </button>
              </div>
              <div className="price">
                {"$ " + (product.price * product.quantity).toFixed(2)}
              </div>
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
      <div className="checkout">
        <div className="totalPrice">
          {
            <>
              <p>Total Price: </p>{" "}
              <p style={{ fontWeight: 700, marginTop: 10 }}>{totalPrice} $</p>
            </>
          }
        </div>
      </div>
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
