export const lessLoadedElevators = (state) => {
    let minQueue = null;
    let ind = [null];
    state.forEach(elev=>{
        if(elev.queue.length < minQueue || minQueue === null){
            minQueue = elev.queue.length;
            ind = [elev.id];
        }
        else if(elev.queue.length === minQueue){
            ind.push(elev.id);
        }
    })

    const result = [];
    state.forEach((e)=>{
        if(ind.includes(e.id)) result.push(e)
    })
    return result;
}

export const closestElevator = (state, floor) => {
    let closestElevator = null;
    let minFloorsToFloor = null;
    const result = lessLoadedElevators(state);
    if(result[0].queue.length === 0) return result[0].id
    result.forEach(e=>{
        const lastFloorInQueue = e.queue[e.queue.length-1]
        const betweenFloors = Math.abs(floor-lastFloorInQueue)
        if(betweenFloors < minFloorsToFloor || minFloorsToFloor === null){
            minFloorsToFloor = betweenFloors
            closestElevator = e.id
        }
    })
    return closestElevator
}