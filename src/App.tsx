import React, { useEffect } from "react";
import "./App.css";
import Cards from "./app/game/Cards";
import Header from "./app/header";
import { initCards } from "./app/game/game.slice";
import { useAppDispatch } from "./store/hooks";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initCards());
  }, [dispatch]);

  return (
    <div className="App">
      <Header />
      <Cards />
    </div>
  );
}

export default App;
