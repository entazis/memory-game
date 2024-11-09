import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { render, screen } from "@testing-library/react";
import Header from "./Header";
import { initialState } from "../game/game.slice";

const mockStore = configureStore([]);

describe("Header component", () => {
  it("renders Logo component", () => {
    const store = mockStore({ game: initialState });
    render(
      <Provider store={store}>
        <Header />
      </Provider>,
    );
    expect(screen.getByAltText("logo")).toBeInTheDocument();
  });

  it("renders ScoreDisplay component", () => {
    const store = mockStore({ game: initialState });
    render(
      <Provider store={store}>
        <Header />
      </Provider>,
    );
    expect(screen.getByText(/matches/i)).toBeInTheDocument();
  });

  it("renders Menu component", () => {
    const store = mockStore({ game: initialState });
    render(
      <Provider store={store}>
        <Header />
      </Provider>,
    );
    expect(screen.getByLabelText(/settings/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/refresh/i)).toBeInTheDocument();
  });
});
