import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import elevator from "./reducers/elevator";
import floors from "./reducers/floors";

const rootReducer = combineReducers({
    elevator: elevator,
    floors: floors,
});

export const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
);

export const getRealFloorStates = (id) => {
    const prev = store.getState().elevator.find((e) => e.id === id).prevFloor;
    const curr = store.getState().elevator.find((e) => e.id === id).currentFloor;
    return { prev: prev, curr: curr };
};

export const getRealVisualFloor = (id) => {
    const visual = store.getState().elevator.find((e) => e.id === id).visualFloor;
    return visual
}