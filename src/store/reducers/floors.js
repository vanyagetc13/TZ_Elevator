import { getFloors } from "./../../utils/settingsReader";

const defaultState = getFloors() || 5;

export default function floors (state = defaultState, action) {
    switch(action.type) {
        case "INCREMENT_COUNT_OF_FLOORS":
            return state + 1;

        case "DECREMENT_COUNT_OF_FLOORS":
            return state - 1;

        default:
            return state;
    }
}