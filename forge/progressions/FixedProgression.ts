import TMaxVaryingSet from "../workout_sets/TMaxVaryingSet";
import Progression from "./Progression";
import ExerciseSet from "../workout_sets/ExerciseSet";
import Matrix, {flatten} from "../common/Matrix";

export class FixedProgression implements Progression{
    private readonly setsMatrix: Matrix<ExerciseSet>;

    constructor(setsMatrix: Matrix<ExerciseSet>) {
        this.setsMatrix = setsMatrix;
    }

    getSetsAtWeek = (week: number): ExerciseSet[] => this.setsMatrix[week];

    getAllSets = (): ExerciseSet[] => flatten(this.setsMatrix);
}