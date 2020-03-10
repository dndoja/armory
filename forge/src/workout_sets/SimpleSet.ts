import ExerciseSet from "./ExerciseSet";

export default class SimpleSet implements ExerciseSet {
    readonly reps: number;
    readonly weight: number;

    constructor(reps: number, weight: number) {
        this.reps = reps;
        this.weight = weight;
    }
}