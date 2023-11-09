import React from "react";
import { render, screen } from "@testing-library/react";
import { SingleProductCard } from "../src/Components/Shop/Shop";
import userEvent from "@testing-library/user-event";
import { expect, vi } from "vitest";

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
    for (let i = 0; i < 2; i += 1) {
      await userEvent.click(plusButton);
    }
    expect(count.textContent).toBe("3");

    const minusButton = screen.getByTestId("minusProduct");
    await userEvent.click(minusButton);
    expect(count.textContent).toBe("2");
  });
});
