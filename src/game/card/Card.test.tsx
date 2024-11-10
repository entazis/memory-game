import {
  fireEvent,
  render,
  RenderResult,
  screen,
} from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import configureMockStore from "redux-mock-store";
import Card from "./Card";
import { flipCard, gameSlice, initialState } from "../game.slice";
import React from "react";

const mockStore = configureMockStore([]);
const store = configureStore({
  reducer: {
    game: gameSlice.reducer,
  },
  preloadedState: { game: initialState },
});

const renderCard = (index: number): RenderResult =>
  render(
    <Provider store={store}>
      <Card index={index} />
    </Provider>,
  );

describe("Card component", () => {
  it("renders the card image correctly", () => {
    const store = mockStore({ game: initialState });
    render(
      <Provider store={store}>
        <Card index={0} />
      </Provider>,
    );
    const card = screen.queryByTestId("card-testid");
    expect(card).toBeInTheDocument();
    expect(card).toHaveAttribute("class");
  });

  it("flips the card when clicked if it is not already flipped", () => {
    const store = mockStore({ game: initialState });
    store.dispatch = jest.fn();
    render(
      <Provider store={store}>
        <Card index={0} />
      </Provider>,
    );
    const cardElement = screen.getByTestId("card-testid");
    fireEvent.click(cardElement);
    expect(store.dispatch).toHaveBeenCalledWith(flipCard(0));
  });

  it("flips the card and adds the 'flipped' class when clicked", () => {
    const { rerender } = renderCard(0);

    const cardElement = screen.getByTestId("card-testid");
    expect(cardElement).not.toHaveClass("flipped");

    fireEvent.click(cardElement);

    rerender(
      <Provider store={store}>
        <Card index={0} />
      </Provider>,
    );

    expect(cardElement).toHaveClass("flipped");
  });

  it("does not flip the card when clicked if it is already flipped", () => {
    const flippedCard = { ...initialState.progress.cards[0], isFlipped: true };
    const store = mockStore({
      game: {
        ...initialState,
        progress: {
          ...initialState.progress,
          cards: [flippedCard],
        },
      },
    });
    store.dispatch = jest.fn();
    render(
      <Provider store={store}>
        <Card index={0} />
      </Provider>,
    );
    const cardElement = screen.getByTestId("card-testid");
    fireEvent.click(cardElement);
    expect(store.dispatch).not.toHaveBeenCalled();
  });

  it("does not render anything if the card is not found", () => {
    const store = mockStore({ game: initialState });
    render(
      <Provider store={store}>
        <Card index={30} />
      </Provider>,
    );
    const cardElement = screen.queryByTestId("card-testid");
    expect(cardElement).toBeNull();
  });
});
