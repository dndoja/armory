import ExerciseSet from "./ExerciseSet";

export function recalculate(old: TMaxVaryingSet, newTrainingMax: number): TMaxVaryingSet {
    return new TMaxVaryingSet(old.reps,old.trainingMax,newTrainingMax)
}

export default class TMaxVaryingSet implements ExerciseSet{
    reps: number;
    trainingMax: number;
    multiplier: number;
    private _weight: number;

    constructor(reps: number, trainingMax: number, multiplier: number = 1) {
        this.reps = reps;
        this.trainingMax = trainingMax;
        this.multiplier = multiplier;
    }

    get weight(): number {
        return this._weight;
    }

    public getMultiplierAsPercentage(): string {
        return (this.multiplier * 100).toString() + "%"
    }
}