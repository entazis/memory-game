import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Card from "./Card";
import { flipCard, initialState } from "../game.slice";

const mockStore = configureStore([]);

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
