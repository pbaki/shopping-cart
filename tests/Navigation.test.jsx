import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import Navigation from "../src/Components/Navigation/Navigation";
import { MemoryRouter } from "react-router-dom";

describe("Navigation Component", () => {
  test("Nav render with quantity", () => {
    render(
      <MemoryRouter>
        <Navigation productsInCartQuantity={() => 5} />
      </MemoryRouter>
    );

    expect(screen.getByText("Store Name")).toBeInTheDocument();
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Shop")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
  });
});
