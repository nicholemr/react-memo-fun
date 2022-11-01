import React, { createContext, FunctionComponent, useReducer } from "react";

export interface Dog {
  id: string;
  breed: string;
  subBreed?: string;
  imgSrc: string;
}

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

interface dogsReducerAction {
  type: "add" | "remove" | "sort";
  dog?: Dog;
  dogs?: Dog[];
}
export const dogsReducer = (state: Dog[], action: dogsReducerAction): Dog[] => {
  switch (action.type) {
    case "add":
      return action.dog ? [...state, action.dog] : [];
    case "remove":
      if (action.dog && action.dog?.id) {
        const removeDogId = action.dog.id;
        return state.filter((dog) => dog.id !== removeDogId);
      }
      return state;
    case "sort":
      return state
        .map((dog) => dog)
        .sort((a, b) => {
          if (a.breed > b.breed) {
            return -1;
          }
          if (a.breed < b.breed) {
            return 1;
          }
          return 0;
        });
    default:
      return state;
  }
};
const reducerInitialState: Dog[] = [];

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
