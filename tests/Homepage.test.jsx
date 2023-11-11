import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import Homepage from "../src/Components/Homepage/Homepage";
import { MemoryRouter } from "react-router-dom";

describe("Homepage Component", () => {
  test("Homepage render with working SHOP NOW button", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Homepage productsInCartQuantity={() => 5} />
      </MemoryRouter>
    );

    expect(screen.getByText("Welcome To Store Name")).toBeInTheDocument();
    expect(screen.getByText("SHOP NOW")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "SHOP NOW" })).toHaveAttribute(
      "href",
      "/shop/1"
    );
  });
});
