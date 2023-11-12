import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import App from "../src/App";

vi.mock("./App", () => ({
  FakeStoreApi: vi.fn(() => ({ data: [], loading: false, error: null })),
}));

describe("App Component", () => {
  test("renders the homepage", async () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText("Welcome To Store Name")).toBeInTheDocument();
    expect(screen.getByText("SHOP NOW")).toBeInTheDocument();
  });

  test("navigates to the shop page", async () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    const shopButton = screen.getByText("SHOP NOW");
    await userEvent.click(shopButton);

    expect(screen.getByText(/Products -/)).toBeInTheDocument();
  });

  test("navigates to the shopping cart page", async () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    const cartLink = screen.getByLabelText("Shopping Cart");
    await userEvent.click(cartLink);

    expect(screen.getByText(/Cart is empty./)).toBeInTheDocument();
  });
});
