import React from 'react';
import { useMemo } from "react";
import Elevator from "./Elevator";
import { useSelector } from "react-redux";

const Shafts = ({shaftCount, floorCount}) => {

    const shaftArray = (shafts) => {
        const result = []

        for(let i = 0; i < shafts; i++){


            result.push(
                <div key={i} className="shaft">
                    <Elevator id={i} floorCount={floorCount}/>
                </div>
            )
        }
        return result
    }

    const shaftCounter = useMemo(()=>{
        return shaftArray(shaftCount)
    }, [shaftCount, floorCount])

    return (
        <div className="shafts_wrapper">
            {shaftCounter}
        </div>
    );
};

export default Shafts;