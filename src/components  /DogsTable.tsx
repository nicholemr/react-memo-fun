import React, { FunctionComponent, useContext, useMemo } from "react";
import { DogsContext } from "../context";
import { Dog } from "../utils/types";

export const DogsTable: FunctionComponent = () => {
  const { dogs, sortDogs, removeDog } = useContext(DogsContext);
  const handleClick = (dog: Dog) => {
    removeDog(dog);
  };
  const tableBody = useMemo(
    () =>
      dogs.map((dog, index) => (
        <tbody key={dog.id}>
          <tr style={{ backgroundColor: index % 2 ? "#a6c3de" : "white" }}>
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
    <div>
      <button onClick={sortDogs}>Sort dogs!</button>
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
    </div>
  );
};
