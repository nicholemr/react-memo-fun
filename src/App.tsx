import React from "react";
import "./App.css";
import { Forms } from "./components  ";
import { DogsContextProvider } from "./context";
import { DogCards } from "./components  /DogCards";
import { DogsTable } from "./components  /DogsTable";

function App() {
  return (
    <div
      className="App"
      style={{
        padding: "1rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <DogsContextProvider
        dogs={[]}
        addDog={() => []}
        removeDog={() => []}
        sortDogs={() => []}
      >
        <Forms />
        <DogsTable />
        <DogCards />
      </DogsContextProvider>
    </div>
  );
}

export default App;
