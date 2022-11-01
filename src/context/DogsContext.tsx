import React, {
  createContext,
  FunctionComponent,
  useCallback,
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
  removeDog: (id: string) => void;
  children?: React.ReactNode;
}

export const DogsContext = createContext<DogsContextValue>({
  dogs: [],
  addDog: (dog: Dog) => null,
  removeDog: (id: string) => null,
});
DogsContext.displayName = "DogsContext";

export const DogsContextProvider: FunctionComponent<DogsContextValue> = ({
  children,
}) => {
  const [dogs, setDogs] = useState<Dog[]>([]);
  const addDog = (dog: Dog) => {
    setDogs([...dogs, dog]);
  };
  const removeDog = (id: string) => {
    const updatedDogs = dogs.filter((dog) => dog.id !== id);
    setDogs(updatedDogs);
  };

  return (
    <DogsContext.Provider value={{ dogs, addDog, removeDog }}>
      {children}
    </DogsContext.Provider>
  );
};
