import ExerciseSet from "./ExerciseSet";

export default class TMaxVaryingSet implements ExerciseSet{
    reps: number;
    trainingMax: number;
    multiplier: number;

    constructor(reps: number, trainingMax: number, multiplier: number = 1) {
        this.reps = reps;
        this.trainingMax = trainingMax;
        this.multiplier = multiplier;
    }

    get weight(): number {
        return this.trainingMax * this.multiplier;
    }

    public getMultiplierAsPercentage(): string {
        return (this.multiplier * 100).toString() + "%"
    }
}