import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders the app", () => {
  render(<App />);
  const scoreDisplayElement = screen.getByText(/matches/i);
  expect(scoreDisplayElement).toBeInTheDocument();
});
