import React, { FunctionComponent, useContext, useState } from "react";
import { Dog, DogsContext } from "../context";
import { v4 as uuid } from "uuid";

export const Forms: FunctionComponent = () => {
  const [dog, setDog] = useState<Dog>();
  const { addDog } = useContext(DogsContext);
  const handleSearchDog = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const url = `https://dog.ceo/api/breed/${dog?.breed}/images/random`;
    fetch(url)
      .then((res) => res.json())
      .then((result) =>
        setDog({ breed: dog?.breed ?? "", imgSrc: result.message, id: uuid() })
      );
  };
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    if (dog) {
      setDog({ ...dog, breed: e.target.value });
    }
  };
  const handleAddDog = () => {
    if (dog) {
      addDog(dog);
    }
    setDog({ breed: "", imgSrc: "", id: "" });
  };

  return (
    <div style={{ padding: "1rem" }}>
      <form onSubmit={handleSearchDog}>
        <label htmlFor="breed-select">
          choose a pet
          <select
            name="breeds"
            id="breed-select"
            value={dog?.breed}
            onChange={handleChange}
          >
            <option value="">--Please choose an option--</option>
            <option value="chihuahua">chihuahua</option>
            <option value="pomeranian">pomeranian</option>
            <option value="dachshund">dachshund</option>
          </select>
        </label>
        <input type="submit" value="Submit" />
      </form>
      <div
        style={{
          padding: "1rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {dog?.imgSrc !== "" && <img src={dog?.imgSrc} width="300"></img>}
        {dog?.imgSrc !== "" && <button onClick={handleAddDog}>Add Dog</button>}
      </div>
    </div>
  );
};
