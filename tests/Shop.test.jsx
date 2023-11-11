import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";
import { SingleProductCard } from "../src/Components/Shop/Shop";
import { MemoryRouter } from "react-router-dom";
import Shop from "../src/Components/Shop/Shop";
import { Routes, Route } from "react-router-dom";

describe("Shop", () => {
  test("Nav component is rendered", () => {
    render(
      <MemoryRouter initialEntries={["/shop/1"]}>
        <Shop
          productsInCartQuantity={() => 3}
          APIData={{
            data: [],
            loading: false,
            error: null,
          }}
        />
      </MemoryRouter>
    );

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
  });
  test("renders shop page content with a specific product", () => {
    render(
      <MemoryRouter initialEntries={["/shop/1"]} keyLength={0}>
        <Routes>
          <Route
            path="/shop/:page"
            element={
              <Shop
                productsInCartQuantity={() => 0}
                APIData={{
                  data: [
                    {
                      id: 1,
                      title: "Product 1",
                      price: 9.99,
                      rating: { rate: 4.5, count: 10 },
                      image: "product1.jpg",
                      category: "Category 1",
                    },
                  ],
                  loading: false,
                  error: null,
                }}
              />
            }
          />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("Product 1")).toBeInTheDocument();
    expect(screen.getByText("$ 9.99")).toBeInTheDocument();
    expect(screen.getByText("Rating 4.5 / 5")).toBeInTheDocument();
    expect(screen.getByText("In Stock: 10")).toBeInTheDocument();

    expect(screen.getByTestId("count")).toHaveTextContent("1");
    expect(screen.getByTestId("plusProduct")).toBeInTheDocument();
    expect(screen.getByTestId("minusProduct")).toBeInTheDocument();

    expect(screen.getByText("Add To Cart")).toBeInTheDocument();
  });

  test("clicking next and previous page button updates the URL and content", async () => {
    let moreObjects = () => {
      let obj = [];
      for (let i = 1; i < 7; i++) {
        obj.push({
          key: i,
          id: i,
          title: "Product 1",
          price: 9.99,
          rating: { rate: 4.5, count: 10 },
          image: "product1.jpg",
          category: "Category 1",
        });
      }
      obj.push({
        key: 7,
        id: 7,
        title: "Product 2",
        price: 19.99,
        rating: { rate: 4.5, count: 3 },
        image: "product2.jpg",
        category: "Category 2",
      });
      return obj;
    };
    const obj = moreObjects();
    const { queryAllByText } = render(
      <MemoryRouter initialEntries={["/shop/1"]} keyLength={0}>
        <Routes>
          <Route
            path="/shop/:page"
            element={
              <Shop
                productsInCartQuantity={() => 0}
                APIData={{
                  data: obj,
                  loading: false,
                  error: null,
                }}
              />
            }
          />
        </Routes>
      </MemoryRouter>
    );
    //render before next page
    const elements = queryAllByText("Product 1");

    expect(elements).toHaveLength(6);
    expect(screen.getByText("++")).toBeInTheDocument();
    expect(screen.getByText("Page: 1/2")).toBeInTheDocument();

    const nextPageButton = screen.getByText("++");
    await userEvent.click(nextPageButton);
    //render after next page
    const elementsAfterPageChange = queryAllByText("Product 1");
    expect(elementsAfterPageChange).toHaveLength(0);
    expect(screen.getByText("Product 2")).toBeInTheDocument();
    expect(screen.getByText("Page: 2/2")).toBeInTheDocument();

    const previousPageButton = screen.getByText("--");
    await userEvent.click(previousPageButton);
    //render after previous page
    expect(elements).toHaveLength(6);
    expect(screen.getByText("Page: 1/2")).toBeInTheDocument();
  });
});

describe("SingleProductCard", () => {
  const product = {
    id: 1,
    title: "Sample Product",
    price: 10.99,
    rating: 4.5,
    count: 10,
    image: "sample.jpg",
  };

  const addToCartFunctionality = vi.fn();
  test("renders product details and buttons", () => {
    render(
      <SingleProductCard
        id={product.id}
        title={product.title}
        price={product.price}
        rating={product.rating}
        count={product.count}
        image={product.image}
        addToCartFunctionality={addToCartFunctionality}
      />
    );

    // Check if product details are displayed
    expect(screen.getByText("Sample Product")).toBeInTheDocument();
    expect(screen.getByText("$ 10.99")).toBeInTheDocument();
    expect(screen.getByText("Rating 4.5 / 5")).toBeInTheDocument();
    expect(screen.getByText("In Stock: 10")).toBeInTheDocument();

    // Check if buttons are displayed
    expect(screen.getByText("+")).toBeInTheDocument();
    expect(screen.getByText("-")).toBeInTheDocument();
    expect(screen.getByText("Add To Cart")).toBeInTheDocument();
  });

  test("clicking add to cart button calls addToCartFunctionality once", async () => {
    render(
      <SingleProductCard
        id={product.id}
        title={product.title}
        price={product.price}
        rating={product.rating}
        count={product.count}
        image={product.image}
        addToCartFunctionality={addToCartFunctionality}
      />
    );
    const button = screen.getByRole("button", { name: "Add To Cart" });
    await userEvent.click(button);
    expect(addToCartFunctionality).toHaveBeenCalledWith(
      1,
      "Sample Product",
      10.99,
      1,
      "sample.jpg",
      10
    );
    expect(addToCartFunctionality).toHaveBeenCalledTimes(1);
  });

  test("clicking + and - buttons", async () => {
    render(
      <SingleProductCard
        id={product.id}
        title={product.title}
        price={product.price}
        rating={product.rating}
        count={product.count}
        image={product.image}
        addToCartFunctionality={addToCartFunctionality}
      />
    );
    let count = screen.getByTestId("count");
    const plusButton = screen.getByTestId("plusProduct");
    for (let i = 0; i < product.count + 1; i += 1) {
      await userEvent.click(plusButton);
    }
    expect(count.textContent).toBe(product.count.toString());

    const minusButton = screen.getByTestId("minusProduct");
    for (let i = 0; i < product.count + 1; i += 1) {
      await userEvent.click(minusButton);
    }
    expect(count.textContent).toBe("1");
  });
});
