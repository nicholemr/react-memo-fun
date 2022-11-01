import React, { FunctionComponent, useContext } from "react";
import { DogsContext } from "../context";

export const Dogs: FunctionComponent = () => {
  const { dogs } = useContext(DogsContext);
  const handleClick = (id: string) => {};

  const dogCards = dogs.map((dog) => (
    <div key={dog.id} style={{ display: "flex", flexDirection: "column" }}>
      <img src={dog.imgSrc} width="300" />
      <button onClick={() => handleClick(dog.id)}>delete</button>
    </div>
  ));

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        gap: "2rem",
      }}
    >
      {dogCards}
    </div>
  );
};
