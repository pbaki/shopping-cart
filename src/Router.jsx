import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./ErrorPage";
import Homepage from "./Components/Homepage/Homepage";
import Shop from "./Components/Shop/Shop";
import ShoppingCart from "./Components/Shopping-cart/Shopping-cart";

const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Homepage />,
      errorElement: <ErrorPage />,
    },
    {
      path: "shop",
      element: <Shop />,
    },
    {
      path: "shopping-cart",
      element: <ShoppingCart />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
