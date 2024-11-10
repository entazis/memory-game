import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Cards from "./Cards";
import { initialState } from "./game.slice";

const mockStore = configureStore([]);

describe("Cards component", () => {
  it("renders all cards correctly", () => {
    const store = mockStore({ game: initialState });
    render(
      <Provider store={store}>
        <Cards />
      </Provider>,
    );
    const cardElements = screen.getAllByTestId("card-testid");
    expect(cardElements.length).toBe(initialState.progress.cards.length);
  });

  it("flips back unmatched cards after timeout", () => {
    const flippedCard1 = { ...initialState.progress.cards[0], isFlipped: true };
    const flippedCard2 = { ...initialState.progress.cards[2], isFlipped: true };
    const store = mockStore({
      game: {
        ...initialState,
        progress: {
          ...initialState.progress,
          cards: [
            flippedCard1,
            flippedCard2,
            ...initialState.progress.cards.slice(2),
          ],
          cardsFlipped: [flippedCard1, flippedCard2],
        },
        settings: {
          ...initialState.settings,
          flipBackTimeout: 1,
        },
      },
    });
    jest.useFakeTimers();
    render(
      <Provider store={store}>
        <Cards />
      </Provider>,
    );
    jest.advanceTimersByTime(1000);
    const actions = store.getActions();
    expect(actions).toContainEqual({ type: "game/flipBackUnmatched" });
    jest.useRealTimers();
  });

  it("ticks the timer every second when game is started", () => {
    jest.useFakeTimers();
    const store = mockStore({
      game: {
        ...initialState,
        progress: {
          ...initialState.progress,
          startedAt: Date.now(),
          endedAt: null,
        },
      },
    });
    render(
      <Provider store={store}>
        <Cards />
      </Provider>,
    );
    jest.advanceTimersByTime(2000);
    const actions = store.getActions();
    expect(actions).toHaveLength(2);
    expect(actions).toContainEqual({ type: "game/tick" });
    jest.useRealTimers();
  });

  it("does not tick the timer when game is ended", () => {
    jest.useFakeTimers();
    const store = mockStore({
      game: {
        ...initialState,
        progress: {
          ...initialState.progress,
          startedAt: Date.now(),
          endedAt: Date.now(),
        },
      },
    });
    render(
      <Provider store={store}>
        <Cards />
      </Provider>,
    );
    jest.advanceTimersByTime(2000);
    const actions = store.getActions();
    expect(actions).not.toContainEqual({ type: "game/tick" });
    jest.useRealTimers();
  });
});
