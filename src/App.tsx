import "./App.css";
import { Forms } from "./components  ";
import { DogsContextProvider } from "./context";
import React from "react";
import { Dogs } from "./components  /Dogs";

function App() {
  return (
    <div className="App" style={{ padding: "1rem" }}>
      <DogsContextProvider dogs={[]} addDog={() => []} removeDog={() => []}>
        <Forms />
        <Dogs />
      </DogsContextProvider>
    </div>
  );
}

export default App;
