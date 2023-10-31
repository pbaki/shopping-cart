import React, { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./ErrorPage";
import Homepage from "./Components/Homepage/Homepage";
import Shop from "./Components/Shop/Shop";
import ShoppingCart from "./Components/Shopping-cart/Shopping-cart";

const Router = () => {
  const callAPI = FakeStoreApi();
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Homepage APIData={callAPI} />,
      errorElement: <ErrorPage />,
    },
    {
      path: "shop/:page",
      element: <Shop APIData={callAPI} />,
    },
    {
      path: "shopping-cart",
      element: <ShoppingCart APIData={callAPI} />,
    },
  ]);
  return <RouterProvider router={router} />;
};

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

export default Router;
