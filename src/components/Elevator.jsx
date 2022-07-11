import React from "react";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import arrow_svg from "../assets/right-arrow.svg";
import { useDispatch } from "react-redux/es/exports";
import {
    decrSleepTimeByID,
    setAsleep,
    setMoveState,
    setPrevFloor,
    shiftQueueSetCurFloor,
} from "../store/reducers/elevator";
import { getRealFloorStates, getRealVisualFloor } from "../store";

const Elevator = ({ id, floorCount }) => {
    const dispatch = useDispatch();
    const elevator = useSelector((state) =>
        state.elevator.find((e) => e.id === id)
    );
    const theQueue = elevator.queue;
    const theFloor = useSelector(
        (state) => state.elevator.find((e) => e.id === id).currentFloor
    );
    const isSleeping = elevator.secondsToSleep !== 0;
    const prevFloor = elevator.prevFloor;
    const isMoving = elevator.isMoving;

    const elevHeight = useMemo(() => {
        return 100 / floorCount;
    }, [floorCount]);

    const curHeight = useMemo(() => {
        return elevHeight * theFloor;
    }, [theQueue, theFloor, elevHeight]);

    const trans_calc = useMemo(() => {
        const { prev, curr } = getRealFloorStates(id);
        return Math.abs(prev - curr);
    }, [theFloor]);

    useEffect(() => {
        if (isMoving) {
            const { prev, curr } = getRealFloorStates(id);
            const between = Math.abs(prev - curr);
            for (let i = 0; i < between; i++) {
                setTimeout(() => {
                    curr > prev
                        ? dispatch({ type: "INCR_VF", payload: id })
                        : dispatch({ type: "DECR_VF", payload: id });
                }, 1000 * i + 500);
            }
        }
    }, [isMoving]);

    const visualFloor = useMemo(() => {
        return getRealVisualFloor(id);
    }, [theFloor, getRealVisualFloor(id)]);

    // timer: Sleep-Reducer
    useEffect(() => {
        const intID = setInterval(() => {
            if (isSleeping) dispatch(decrSleepTimeByID(id));
            if (isMoving) {
            } // visual floornumber
        }, 1000);

        return () => {
            clearInterval(intID);
        };
    }, [isSleeping]);

    const moveElevator = () => {
        dispatch(setPrevFloor(id));
        dispatch(shiftQueueSetCurFloor(id));
        dispatch(setMoveState({ id: id, state: true }));
        // setCurFloor(theFloor);
        const { prev, curr } = getRealFloorStates(id);
        setTimeout(() => {
            dispatch(setMoveState({ id: id, state: false }));
            dispatch(setAsleep(id));
        }, Math.abs(prev - curr) * 1000);
    };

    useEffect(() => {
        if (!isSleeping && theQueue.length > 0 && !isMoving) {
            moveElevator();
        }
    }, [theQueue, isSleeping, isMoving]);

    return (
        <div
            className="elevator"
            style={{
                height: `${elevHeight}%`,
                bottom: `${curHeight}%`,
                transition: `all ${trans_calc}s linear`,
            }}
        >
            <div className="elevator__panel">
                {isMoving ? (
                    prevFloor < theFloor ? (
                        <img
                            src={arrow_svg}
                            alt="arrowup"
                            className="elevator__state up"
                        ></img>
                    ) : (
                        <img
                            src={arrow_svg}
                            alt="arrowdown"
                            className="elevator__state down"
                        ></img>
                    )
                ) : (
                    <span>&#8226;</span>
                )}

                <span>{`${visualFloor + 1}`}</span>
            </div>
        </div>
    );
};

export default Elevator;
