import React, { FunctionComponent, useContext, useState } from "react";
import { DogsContext } from "../context";
import { v4 as uuid } from "uuid";
import { Dog } from "../utils/types";

export const Forms: FunctionComponent = () => {
  const [dog, setDog] = useState<Dog>();
  const [subBreeds, setSubBreeds] = useState([]);
  const [subBreed, setSubBreed] = useState("");
  const [error, setError] = useState("");
  const { addDog } = useContext(DogsContext);
  const handleSearchDog = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const subBreedListUrl = `https://dog.ceo/api/breed/${dog?.breed}/list`;
    const url = `https://dog.ceo/api/breed/${dog?.breed}/images/random`;
    fetch(url)
      .then((res) => res.json())
      .then((result) => {
        console.log("searching breed list", result);
        if (result.status === "success") {
          setDog({
            imgSrc: result.message,
            breed: dog?.breed ?? "",
            id: dog?.id ?? "",
          });
          setError("");
          return fetch(subBreedListUrl);
        } else if (result.status === "error") {
          setError(result.message);
        }
      })
      .then((res) => {
        if (res) {
          return res.json();
        }
      })
      .then((result) => {
        console.log("subreeds?", result);
        if (result.message && result.message.length > 0) {
          setSubBreeds(result.message);
        } else {
          setSubBreeds([]);
          setError("");
        }
        if (result.status === "error") {
          setError(result.message);
        }
      });
  };
  const handleSearchSubBreed = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const subBreedUrl = `https://dog.ceo/api/breed/${dog?.breed}/${subBreed}/images/random`;
    fetch(subBreedUrl)
      .then((res) => res.json())
      .then((result) => {
        console.log("searching Subbreed", result);
        if (result.status === "success") {
          setDog({
            id: "",
            breed: dog?.breed ?? "",
            imgSrc: result.message,
            subBreed: subBreed,
          });
          setError("");
        } else if (result.status === "error") {
          setError(result.message);
        }
      });
  };
  const handleBreedChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    setDog({ breed: e.target.value, id: uuid(), imgSrc: "" });
    setSubBreeds([]);
  };
  const handleSubBreedChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    setSubBreed(e.target.value);
  };
  const handleSubmitDog = () => {
    if (dog?.breed) {
      addDog({ ...dog, id: uuid() });
    }
    setDog(undefined);
    setSubBreeds([]);
    setSubBreed("");
  };

  return (
    <div
      style={{
        padding: "1rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1rem",
      }}
    >
      <form
        onSubmit={handleSearchDog}
        style={{ display: "flex", flexDirection: "row", gap: "0.5rem" }}
      >
        <label htmlFor="breed-select">choose a pet</label>
        <select
          name="breeds"
          id="breed-select"
          value={dog?.breed}
          onChange={handleBreedChange}
        >
          <option value="">--Please choose an option--</option>
          <option value="chihuahua">chihuahua</option>
          <option value="pomeranian">pomeranian</option>
          <option value="dachshund">dachshund</option>
          <option value="hound">hound</option>
        </select>

        <input type="submit" value="Submit" />
      </form>

      {subBreeds.length > 0 && (
        <form
          onSubmit={handleSearchSubBreed}
          style={{ display: "flex", flexDirection: "row", gap: "0.5rem" }}
        >
          <label htmlFor="subbreed-select">choose a subbreed</label>
          <select
            name="subbreeds"
            id="subbreed-select"
            value={dog?.breed}
            onChange={handleSubBreedChange}
          >
            {subBreeds.map((breed) => (
              <option key={breed} value={breed}>
                {breed}
              </option>
            ))}
          </select>

          <input type="submit" value="Submit" />
        </form>
      )}
      {error && <div>{error}</div>}
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
          <h2>{dog.breed}</h2>
          <h3>{dog.subBreed}</h3>
          <img src={dog?.imgSrc} width="300"></img>
          <button onClick={handleSubmitDog}>Add Dog</button>
        </div>
      )}
    </div>
  );
};
