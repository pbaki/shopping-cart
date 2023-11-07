import { useState, useEffect } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Homepage from "./Components/Homepage/Homepage";
import Shop from "./Components/Shop/Shop";
import ShoppingCart from "./Components/Shopping-cart/Shopping-cart";
import ErrorPage from "./ErrorPage";

function App() {
  const callAPI = FakeStoreApi();
  const [data, setData] = useState([]);
  const [quantityRefresh, setQuantityRefresh] = useState(true);

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
    return <>{quantity}</>;
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Homepage
            APIData={callAPI}
            productsInCartQuantity={productsInCartQuantity}
          />
        }
      ></Route>
      <Route
        path="/shop/:page"
        element={
          <Shop
            APIData={callAPI}
            addToCartFunctionality={addToCartFunctionality}
            productsInCartQuantity={productsInCartQuantity}
          />
        }
      ></Route>
      <Route
        path="/shopping-cart"
        element={
          <ShoppingCart
            APIData={callAPI}
            data={data}
            updatedData={updatedData}
            productsInCartQuantity={productsInCartQuantity}
          />
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
