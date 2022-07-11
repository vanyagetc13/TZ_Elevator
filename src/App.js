import React, { useState } from "react";
import "./App.css";
import Floors from "./components/Floors";
import Shafts from "./components/Shafts";
import { getElevators, getFloors } from "./utils/settingsReader";

function App() {
    const [floorCount, setFloorCount] = useState(getFloors())
    const [shaftCount, setShaftCount] = useState(getElevators())

    const [floor_need, setFloor] = useState(1) // from 1 to {floorCount}

    const Floor = (floor) => {
        setFloor(floor)
    }

    return (
        <div className="App">
            <Shafts floorCount={floorCount} shaftCount={shaftCount} floor_need={floor_need}/>
            <Floors floorCount={floorCount}/>
        </div>
    );
}

export default App;