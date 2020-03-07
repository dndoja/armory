import TMaxVaryingSet from "../workout_sets/TMaxVaryingSet";
import Progression from "./Progression";
import ExerciseSet from "../workout_sets/ExerciseSet";
import Matrix, {flatten} from "../common/Matrix";
import {List} from "immutable";

export class FixedProgression implements Progression{
    readonly setsMatrix: Matrix<ExerciseSet>;

    constructor(setsMatrix: Matrix<ExerciseSet>) {
        this.setsMatrix = setsMatrix;
    }

    getSetsAtWeek = (week: number): List<ExerciseSet> => this.setsMatrix.get(week) ?? List();

    getAllSets = (): List<ExerciseSet> => flatten(this.setsMatrix);

    updateSets(transformation: (set: ExerciseSet) => ExerciseSet): Progression {
        return new FixedProgression(this.setsMatrix.map(row => row.map(set => transformation(set))))
    }
}