import ExerciseSet from "./ExerciseSet";

export default class TMaxVaryingSet implements ExerciseSet{
    readonly reps: number;
    readonly trainingMax: number;
    readonly multiplier: number;
    readonly weight: number;
    readonly multiplierAsPercentage: string;

    constructor(reps: number, trainingMax: number, multiplier: number = 1) {
        this.reps = reps;
        this.trainingMax = trainingMax;
        this.multiplier = multiplier;
        this.weight = this.trainingMax * this.multiplier;
        this.multiplierAsPercentage = (this.multiplier * 100).toString() + "%";
    }
}