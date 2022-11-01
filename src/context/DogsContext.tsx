import React, {
  createContext,
  FunctionComponent,
  useCallback,
  useReducer,
  useState,
} from "react";

export interface Dog {
  id: string;
  breed: string;
  imgSrc: string;
}

export interface DogsContextValue {
  dogs: Dog[];
  addDog: (dog: Dog) => void;
  removeDog: (sdog: Dog) => void;
  children?: React.ReactNode;
}

export const DogsContext = createContext<DogsContextValue>({
  dogs: [],
  addDog: () => null,
  removeDog: () => null,
});
DogsContext.displayName = "DogsContext";

interface dogsReducerAction {
  type: "add" | "remove";
  dog: Dog;
}
export const dogsReducer = (state: Dog[], action: dogsReducerAction): Dog[] => {
  switch (action.type) {
    case "add":
      return [...state, action.dog];
    case "remove":
      const updatedDogs = state.filter((dog) => dog.id !== action.dog.id);
      return updatedDogs;
    default:
      return state;
  }
};
const reducerInitialState: Dog[] = [{ breed: "", id: "", imgSrc: "" }];

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

  return (
    <DogsContext.Provider value={{ dogs, addDog, removeDog }}>
      {children}
    </DogsContext.Provider>
  );
};
