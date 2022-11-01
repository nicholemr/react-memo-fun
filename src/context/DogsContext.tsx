import React, { createContext, FunctionComponent, useReducer } from "react";
import { Dog } from "../utils/types";
import { dogsReducer, reducerInitialState } from "./DogsReducer";

export interface DogsContextValue {
  dogs: Dog[];
  addDog: (dog: Dog) => void;
  removeDog: (dog: Dog) => void;
  sortDogs: () => void;
  children?: React.ReactNode;
}

export const DogsContext = createContext<DogsContextValue>({
  dogs: [],
  addDog: () => null,
  removeDog: () => null,
  sortDogs: () => null,
});
DogsContext.displayName = "DogsContext";

export const DogsContextProvider: FunctionComponent<DogsContextValue> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(dogsReducer, reducerInitialState);
  const dogs = state;

  const addDog = (dog: Dog) => {
    dispatch({ type: "add", dog });
  };
  const removeDog = (dog: Dog) => {
    dispatch({ type: "remove", dog });
  };
  const sortDogs = () => {
    dispatch({ type: "sort" });
  };

  return (
    <DogsContext.Provider value={{ dogs, addDog, removeDog, sortDogs }}>
      {children}
    </DogsContext.Provider>
  );
};
