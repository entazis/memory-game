import React from "react";
import {
  fireEvent,
  render,
  RenderResult,
  screen,
} from "@testing-library/react";
import App from "./App";
import { gameSlice, initialState } from "./app/game/game.slice";
import { Provider } from "react-redux";
import userEvent from "@testing-library/user-event";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    game: gameSlice.reducer,
  },
  preloadedState: { game: initialState },
});
const renderApp = (): RenderResult =>
  render(
    <Provider store={store}>
      <App />
    </Provider>,
  );

//TODO add more test cases: matching cards, unmatching cards, game reset, hitting bad guesses limit, hitting time limit, etc.

describe("App", () => {
  it("renders the app", () => {
    renderApp();
    const linkElement = screen.getByText(/matches/i);
    expect(linkElement).toBeInTheDocument();
  });

  it("renders the app and interacts with settings", async () => {
    renderApp();
    expect(screen.getByText(/matches/i)).toBeInTheDocument();

    await userEvent.click(screen.getByTestId("settings-icon"));
    expect(screen.getByLabelText("settings-modal")).toBeInTheDocument();
    await userEvent.click(screen.getByLabelText("close"));
    expect(screen.queryByLabelText("settings-modal")).toBe(null);
  });

  it("handles card flipping and matching", async () => {
    const { rerender } = renderApp();

    const cards = screen.getAllByTestId("card-testid");
    expect(cards[0]).not.toHaveClass("flipped");
    expect(cards[1]).not.toHaveClass("flipped");
    fireEvent.click(cards[0]);
    fireEvent.click(cards[1]);

    rerender(
      <Provider store={store}>
        <App />
      </Provider>,
    );

    expect(cards[0]).toHaveClass("flipped");
    expect(cards[1]).toHaveClass("flipped");

    //TODO test matching cards
    //TODO test unmatching cards
  });

  it("handles game reset", async () => {
    const { rerender } = renderApp();

    const cards = screen.getAllByTestId("card-testid");
    expect(cards[0]).not.toHaveClass("flipped");

    fireEvent.click(cards[0]);

    rerender(
      <Provider store={store}>
        <App />
      </Provider>,
    );

    //TODO fix test

    // expect(cards[0]).toHaveClass("flipped");
    //
    // fireEvent.click(screen.getByTestId("refresh-icon"));
    //
    // rerender(
    //   <Provider store={store}>
    //     <App />
    //   </Provider>,
    // );
    //
    // expect(cards[0]).not.toHaveClass("flipped");
  });
});
