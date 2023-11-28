import { useState, useEffect, createContext } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navigation from "./Components/Navigation/Navigation";
import Homepage from "./Components/Homepage/Homepage";
import Shop from "./Components/Shop/Shop";
import ShoppingCart from "./Components/Shopping-cart/Shopping-cart";
import ErrorPage from "./ErrorPage";

export const ShopContext = createContext({
  addToCartFunctionality: () => {},
});

function App() {
  const callAPI = FakeStoreApi();
  const [data, setData] = useState([]);

  const addToCartFunctionality = (
    id,
    title,
    price,
    quantity,
    image,
    totalCount
  ) => {
    const newData = {
      id: id,
      title: title,
      price: price,
      quantity: quantity,
      image: image,
      totalCount: totalCount,
    };
    setData((prevData) => {
      const ifThere = prevData.find((item) => item.id === newData.id);
      if (ifThere) {
        return prevData.map((item) => {
          if (item.id === newData.id) {
            return { ...item, quantity: item.quantity + newData.quantity };
          }
          return item;
        });
      } else {
        return [...prevData, newData];
      }
    });
  };
  function updatedData(data) {
    setData(data);
  }
  function productsInCartQuantity() {
    let quantity = 0;
    data.map((product) => {
      quantity += product.quantity;
    });
    return <>{quantity > 0 ? quantity : null}</>;
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Navigation productsInCartQuantity={productsInCartQuantity}>
            <Homepage title="Homepage" />
          </Navigation>
        }
      ></Route>
      <Route
        path="/shop/:page"
        element={
          <Navigation productsInCartQuantity={productsInCartQuantity}>
            <ShopContext.Provider value={{ addToCartFunctionality }}>
              <Shop
                title="Shop"
                APIData={callAPI}
                addToCartFunctionality={addToCartFunctionality}
              />
            </ShopContext.Provider>
          </Navigation>
        }
      ></Route>
      <Route
        path="/shopping-cart"
        element={
          <Navigation productsInCartQuantity={productsInCartQuantity}>
            <ShoppingCart title="Cart" data={data} updatedData={updatedData} />
          </Navigation>
        }
      ></Route>
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}
function FakeStoreApi() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    function fetchStoreData() {
      fetch("https://fakestoreapi.com/products")
        .then((response) => {
          if (response.status >= 400) {
            throw new Error("server error");
          }
          return response.json();
        })
        .then((data) => {
          setData(data);
        })
        .catch((error) => setError(error))
        .finally(() => setLoading(false));
      return data;
    }
    fetchStoreData();
  }, []);
  return { data, loading, error };
}
export default App;
