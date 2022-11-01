import React from "react";
import "./App.css";
import { Forms } from "./components  ";
import { DogsContextProvider } from "./context";
import { Dogs } from "./components  /Dogs";
import { DogsTable } from "./components  /DogsTable";

function App() {
  return (
    <div className="App" style={{ padding: "1rem" }}>
      <DogsContextProvider
        dogs={[]}
        addDog={() => []}
        removeDog={() => []}
        sortDogs={() => []}
      >
        <Forms />
        <Dogs />
        <DogsTable />
      </DogsContextProvider>
    </div>
  );
}

export default App;
