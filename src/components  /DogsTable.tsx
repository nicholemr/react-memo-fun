import React, { FunctionComponent, useContext, useMemo } from "react";
import { DogsContext } from "../context";

export const DogsTable: FunctionComponent = () => {
  const { dogs, sortDogs } = useContext(DogsContext);

  const tableBody = useMemo(
    () =>
      dogs.map((dog, index) => (
        <tbody key={dog.id}>
          <tr style={{ backgroundColor: index % 2 ? "#a6c3de" : "white" }}>
            <td style={{ textAlign: "left" }}>{dog.breed}</td>
            <td style={{ textAlign: "left" }}>{dog.subBreed ?? ""}</td>
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
            <th>Subbreed</th>
          </tr>
        </thead>
        {tableBody}
      </table>
    </div>
  );
};
