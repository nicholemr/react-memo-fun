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
  children?: React.ReactNode;
}

export const DogsContext = createContext<DogsContextValue>({
  dogs: [],
  addDog: (dog: Dog) => null,
});
DogsContext.displayName = "DogsContext";

export const DogsContextProvider: FunctionComponent<DogsContextValue> = ({
  children,
}) => {
  const [dogs, setDogs] = useState<Dog[]>([]);
  const addDog = (dog: Dog) => {
    setDogs([...dogs, dog]);
  };

  return (
    <DogsContext.Provider value={{ dogs, addDog }}>
      {children}
    </DogsContext.Provider>
  );
};
