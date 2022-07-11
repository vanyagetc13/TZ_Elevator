import { getElevators } from "../../utils/settingsReader";
import { closestElevator } from "../behaviors/elevator";

const defaultElevator = {
    id: 0,
    currentFloor: 0,
    prevFloor: 0,
    queue: [],
    secondsToSleep: 0,
    isMoving: false,
    visualFloor: 0
};

const returnDefaultStateArray = (floors) => {
    const result = [];
    for (let i = 0; i < floors; i++) {
        result.push({ ...defaultElevator, id: i });
    }
    return result;
};

const defaultState = returnDefaultStateArray(getElevators()) || defaultElevator;

export default function elevator(state = defaultState, action) {
    switch (action.type) {
        case "MOVE_TO":
            const id = closestElevator(state, action.payload);
            const tempElev = state.find((e) => e.id === id);
            const newQueue = [...tempElev.queue, action.payload];
            const newElev = { ...tempElev, queue: newQueue };
            return [...state.filter((e) => e.id !== id), newElev];

        case "MOVED":
            const temper = state.find((e) => e.id === action.payload);
            const Q = temper.queue.shift();
            const newE = { ...temper, queue: Q };
            return [...state.filter((e) => e.id !== action.payload), newE];

        case "SLEEP":
            return [
                ...state.filter((e) => e.id !== action.payload),
                {
                    ...state.find((e) => e.id === action.payload),
                    secondsToSleep: 3,
                },
            ];

        case "DECREMENT_SLEEP":
            const temper1 = state.find((e) => e.id === action.payload);
            if (temper1.secondsToSleep !== 0)
                return [
                    ...state.filter((e) => e.id !== action.payload),
                    { ...temper1, secondsToSleep: temper1.secondsToSleep - 1 },
                ];
            else return state;

        case "SHIFT_QUEUE_SET_FLOOR":
            const Queue = state.find((e) => e.id === action.payload).queue;
            const newFloor = Queue[0];
            Queue.shift();
            return [
                ...state.filter((e) => e.id !== action.payload),
                {
                    ...state.find((e) => e.id === action.payload),
                    queue: Queue,
                    currentFloor: newFloor,
                },
            ];

        case "SET_MOVE_STATE":
            return [
                ...state.filter((e) => e.id !== action.payload.id),
                {
                    ...state.find((e) => e.id === action.payload.id),
                    isMoving: action.payload.state,
                },
            ];
        case "SET_PREV_FLOOR":
            return [
                ...state.filter((e) => e.id !== action.payload),
                {
                    ...state.find((e) => e.id === action.payload),
                    prevFloor: state.find((e) => e.id === action.payload)
                        .currentFloor,
                },
            ];
        case "INCR_VF":
            return [
                ...state.filter((e) => e.id !== action.payload),
                {
                    ...state.find((e) => e.id === action.payload),
                    visualFloor: state.find((e) => e.id === action.payload)
                        .visualFloor + 1
                },
            ];
        case "DECR_VF":
            return [
                ...state.filter((e) => e.id !== action.payload),
                {
                    ...state.find((e) => e.id === action.payload),
                    visualFloor: state.find((e) => e.id === action.payload)
                        .visualFloor - 1
                },
            ];
        default:
            return state;
    }
}

export const decrSleepTimeByID = (payload) => ({
    type: "DECREMENT_SLEEP",
    payload,
});
export const setAsleep = (payload) => ({ type: "SLEEP", payload });
export const moveTo = (payload) => ({ type: "MOVE_TO", payload });

export const shiftQueueSetCurFloor = (payload) => ({
    type: "SHIFT_QUEUE_SET_FLOOR",
    payload,
});

export const setPrevFloor = (payload) => ({ type: "SET_PREV_FLOOR", payload });
export const setMoveState = (payload) => ({ type: "SET_MOVE_STATE", payload });