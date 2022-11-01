import React, { FunctionComponent, useContext } from "react";
import { DogsContext } from "../context";

export const Dogs: FunctionComponent = () => {
  const { dogs } = useContext(DogsContext);
  const handleClick = (id: string) => {};

  const dogCards = dogs.map((dog) => (
    <div key={dog.id}>
      <img src={dog.imgSrc} width="450" />
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
