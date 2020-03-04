import TMaxVaryingSet from "../workout_sets/TMaxVaryingSet";
import Progression from "./Progression";
import ExerciseSet from "../workout_sets/ExerciseSet";

export class FixedProgression implements Progression{
    private readonly setsMatrix: ExerciseSet[][];

    private _flattenedMatrix: ExerciseSet[];

    constructor(setsMatrix: ExerciseSet[][]) {
        this.setsMatrix = setsMatrix;
    }

    getSetsAtWeek(week: number): ExerciseSet[] {
        return this.setsMatrix[week];
    }

    getAllSets(): ExerciseSet[]{
        if (this._flattenedMatrix == undefined){
            this._flattenedMatrix = [].concat(...this.setsMatrix);
        }
        return this._flattenedMatrix;
    }
}