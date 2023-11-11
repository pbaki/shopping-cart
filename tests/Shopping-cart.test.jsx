import React from "react";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import ShoppingCart from "../src/Components/Shopping-cart/Shopping-cart";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, test, vi } from "vitest";

describe("Shopping Cart", () => {
  test("renders empty cart message when there are no products", () => {
    render(
      <MemoryRouter initialEntries={["/shopping-cart"]}>
        <ShoppingCart data={[]} productsInCartQuantity={() => 3} />
      </MemoryRouter>
    );
    expect(
      screen.getByText("Cart is empty. Click button below to start shopping.")
    ).toBeInTheDocument();
    expect(screen.getByText("SHOP NOW")).toBeInTheDocument();
  });

  test("renders cart with items when there are products", () => {
    const mockData = [
      {
        id: 1,
        title: "Product 1",
        price: 10.99,
        quantity: 2,
        image: "product1.jpg",
      },
    ];
    render(
      <MemoryRouter initialEntries={["/shopping-cart"]}>
        <ShoppingCart data={mockData} productsInCartQuantity={() => 3} />
      </MemoryRouter>
    );

    expect(screen.getByText("Product 1")).toBeInTheDocument();
    expect(screen.getByText("$ 21.98")).toBeInTheDocument();

    expect(screen.getByText("+")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("-")).toBeInTheDocument();
  });

  test("updates data when quantity buttons are clicked", async () => {
    const mockData = [
      {
        id: 1,
        title: "Product 1",
        price: 10.99,
        quantity: 2,
        image: "product1.jpg",
        totalCount: 10,
      },
    ];

    const mockUpdatedData = vi.fn();
    render(
      <MemoryRouter initialEntries={["/shopping-cart"]}>
        <ShoppingCart
          data={mockData}
          productsInCartQuantity={() => 3}
          updatedData={mockUpdatedData}
        />
      </MemoryRouter>
    );
    expect(screen.getByText("+")).toBeInTheDocument();
    await userEvent.click(screen.getByText("+"));
    expect(mockUpdatedData).toHaveBeenCalledWith([
      {
        id: 1,
        title: "Product 1",
        price: 10.99,
        quantity: 3,
        image: "product1.jpg",
        totalCount: 10,
      },
    ]);

    expect(screen.getByText("-")).toBeInTheDocument();
    await userEvent.click(screen.getByText("-"));
    expect(mockUpdatedData).toHaveBeenCalledWith([
      {
        id: 1,
        title: "Product 1",
        price: 10.99,
        quantity: 2,
        image: "product1.jpg",
        totalCount: 10,
      },
    ]);
  });

  test("delete product button works", async () => {
    const mockData = [
      {
        id: 1,
        title: "Product 1",
        price: 10.99,
        quantity: 2,
        image: "product1.jpg",
        totalCount: 10,
      },
    ];
    render(
      <MemoryRouter initialEntries={["/shopping-cart"]}>
        <ShoppingCart
          data={mockData}
          productsInCartQuantity={() => 3}
          updatedData={(asd) => null}
        />
      </MemoryRouter>
    );
    expect(screen.getByText("Product 1")).toBeInTheDocument();
    expect(screen.getByText("X")).toBeInTheDocument();
    await userEvent.click(screen.getByText("X"));
    const element = screen.queryByText("Product 1");
    expect(element).toBeNull();
  });
});
