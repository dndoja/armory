import Workout from "./Workout";

export default class ProgramWeek {
    workouts: Workout[];

    constructor(workouts: Workout[]) {
        this.workouts = workouts;
    }
}