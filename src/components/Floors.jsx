import React from "react";
import { useMemo } from "react";
import { useDispatch } from "react-redux/es/exports";
import { moveTo } from "../store/reducers/elevator";

const Floors = ({ floorCount }) => {
    const dispatch = useDispatch()

    const callElevator = (floor) => {
        dispatch(moveTo(floor))
    }

    const floorArray = (floors) => {
        const result = [];
        for (let i = 0; i < floors; i++) {
            result.push(
                <div key={i + 1} className="floor">
                    <div className="floor__panel">
                        <div>{i + 1}</div>
                        <button onClick={()=> callElevator(i)} className="floor__button"></button>
                    </div>
                </div>
            );
        }
        return result;
    };
    const floorCounter = useMemo(() => {
        return floorArray(floorCount);
    }, [floorCount]);


    return <div className="floor_wrapper">{floorCounter}</div>;
};

export default Floors;
