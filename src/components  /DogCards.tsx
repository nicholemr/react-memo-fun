import React, { FunctionComponent, useContext, useMemo } from "react";
import { DogsContext } from "../context";
import { Dog } from "../utils/types";

export const DogCards: FunctionComponent = () => {
  const { dogs } = useContext(DogsContext);

  if (dogs.length < 1) {
    return null;
  }

  const dogCards = useMemo(
    () =>
      dogs.map((dog) => (
        <div
          key={dog.id}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            borderRadius: "0.5rem",
            width: "fit-content",
            padding: "1rem",
            height: "550px",
            backgroundColor: "#f1f7ff",
            boxShadow: "2px 2px 2px 2px gray",
          }}
        >
          <img src={dog.imgSrc} width="300" />
        </div>
      )),
    [dogs]
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        gap: "2rem",
        width: "950px",
        padding: "1rem",
        backgroundColor: "#c6d5eb",
        border: "8px solid #806464",
        overflowX: "scroll",
      }}
    >
      {dogCards}
    </div>
  );
};
