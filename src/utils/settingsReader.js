import settings from "../settings.json"

export const getElevators = () => {
    return settings.elevators
}
export const getFloors = () => {
    return settings.floors
}