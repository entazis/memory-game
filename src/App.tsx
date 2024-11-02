import React from "react";
import "./App.css";
import Cards from "./game/Cards";
import Header from "./header/Header";

function App() {
  return (
    <div className="App">
      <Header />
      <Cards />
    </div>
  );
}

export default App;
