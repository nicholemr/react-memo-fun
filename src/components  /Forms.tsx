import React, { FunctionComponent, useContext, useState } from "react";
import { Dog, DogsContext } from "../context";
import { v4 as uuid } from "uuid";

export const Forms: FunctionComponent = () => {
  const [dog, setDog] = useState<Dog>();
  const [subBreeds, setSubBreeds] = useState([]);
  const { addDog } = useContext(DogsContext);
  const handleSearchDog = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const url = `https://dog.ceo/api/breed/${dog?.breed}/images/random`;
    fetch(url)
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setDog({ breed: dog?.breed ?? "", imgSrc: result.message, id: uuid() });
      });

    const subBreedUrl = `https://dog.ceo/api/breed/${dog?.breed}/list`;
    fetch(subBreedUrl)
      .then((res) => res.json())
      .then((result) => {
        if (result.message.length > 0) {
          setSubBreeds(result.message);
        } else {
          setSubBreeds([]);
        }
      });
  };
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    if (dog) {
      setDog({ ...dog, breed: e.target.value });
      setSubBreeds([]);
    }
  };
  const handleAddDog = () => {
    if (dog) {
      addDog(dog);
    }
    setDog({ breed: "", imgSrc: "", id: "" });
    setSubBreeds([]);
  };

  return (
    <div
      style={{
        padding: "1rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <form onSubmit={handleSearchDog}>
        <label htmlFor="breed-select">
          choose a pet<br></br>
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
            <option value="hound">hound</option>
          </select>
        </label>
        <input type="submit" value="Submit" />
      </form>

      {subBreeds.length > 0 && (
        <form>
          <label htmlFor="subbreed-select">
            choose a subBreed<br></br>
            <select
              name="subbreeds"
              id="subbreed-select"
              value={dog?.breed}
              onChange={handleChange}
            >
              {subBreeds.map((breed) => (
                <option key={breed} value={breed}>
                  {breed}
                </option>
              ))}
            </select>
          </label>
          {/* <input type="submit" value="Submit" /> */}
        </form>
      )}
      {dog?.imgSrc.includes("https://images.dog.ceo/breeds/") && (
        <div
          style={{
            padding: "1rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            border: "1px solid black",
            borderRadius: "0.5rem",
            width: "fit-content",
          }}
        >
          <img src={dog?.imgSrc} width="300"></img>
          <button onClick={handleAddDog}>Add Dog</button>
        </div>
      )}
    </div>
  );
};
