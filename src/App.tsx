import React, { useEffect } from "react";
import "./App.css";
import Cards from "./game/Cards";
import Header from "./header/Header";
import { initCards } from "./game/game.slice";
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
