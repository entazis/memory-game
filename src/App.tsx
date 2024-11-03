import React, { useEffect } from "react";
import "./App.css";
import Cards from "./game/Cards";
import Header from "./header/Header";
import { createDeck } from "./game/game.slice";
import { useAppDispatch } from "./store/hooks";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(createDeck());
  }, [dispatch]);

  return (
    <div className="App">
      <Header />
      <Cards />
    </div>
  );
}

export default App;
