import { Dog } from "../utils/types";

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
export const reducerInitialState: Dog[] = [];
