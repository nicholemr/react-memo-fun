import React, { FunctionComponent, useContext, useMemo } from "react";
import { DogsContext } from "../context";
import { Dog } from "../utils/types";

export const DogsTable: FunctionComponent = () => {
  const { dogs, sortDogs, removeDog } = useContext(DogsContext);
  const handleClick = (dog: Dog) => {
    removeDog(dog);
  };
  if (dogs.length < 1) {
    return null;
  }
  const tableBody = useMemo(
    () =>
      dogs.map((dog, index) => (
        <tbody key={dog.id}>
          <tr
            style={{
              backgroundColor: index % 2 ? "#a6c3de" : "white",
            }}
          >
            <td style={{ textAlign: "left" }}>{dog.breed}</td>
            <td style={{ textAlign: "left" }}>{dog.subBreed ?? ""}</td>
            <td style={{ textAlign: "left" }}>
              <button onClick={() => handleClick(dog)}>delete</button>
            </td>
          </tr>
        </tbody>
      )),
    [sortDogs, dogs]
  );

  return (
    <div
      style={{
        padding: "1rem",
        margin: "1rem",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#90adc3",
        borderRadius: "2px",
        gap: "0.5rem",
      }}
    >
      <h1 style={{ margin: 0 }}>My dogs</h1>

      <table>
        <thead>
          <tr>
            <th>My dog breeds</th>
            <th>Subbreed?</th>
            <th>Delete</th>
          </tr>
        </thead>
        {tableBody}
      </table>
      <button onClick={sortDogs} style={{ width: "6rem" }}>
        Sort dogs!
      </button>
    </div>
  );
};
