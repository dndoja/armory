import Exercise from "../Exercise";
import Progression from "../progressions/Progression";
import ExerciseBlueprint from "./ExerciseBlueprint";
import {v4 as uuid} from 'uuid';
import TMaxVaryingSet from "../workout_sets/TMaxVaryingSet";
import {FixedProgression} from "../progressions/FixedProgression";
import {IdMap} from "../common/IdMap";
import Matrix, {createMatrix} from "../common/Matrix";
import ExerciseSet from "../workout_sets/ExerciseSet";

export default class BlockBlueprint {
    readonly totalWeeks: number;
    readonly trainingDaysPerWeek: number;
    private readonly blueprintIdToExerciseIdMap: Matrix<string>;
    private readonly daysToExerciseIdsMatrix: Matrix<string>;
    private readonly exercisesMap: IdMap<Exercise>;
    private readonly exercisesToProgressionMatrix: IdMap<Progression>;

    constructor(totalWeeks: number, trainingDaysPerWeek: number) {
        this.totalWeeks = totalWeeks;
        this.trainingDaysPerWeek = trainingDaysPerWeek;
        this.daysToExerciseIdsMatrix = createMatrix(trainingDaysPerWeek);
        this.blueprintIdToExerciseIdMap = createMatrix();
        this.exercisesMap = {};
        this.exercisesToProgressionMatrix = {};
    }

    public log(){
        console.log(this.exercisesToProgressionMatrix)
    }

    addExerciseForDay(blueprint: ExerciseBlueprint, day: number, progression: Progression) {
        const exerciseId = uuid();
        this.exercisesMap[exerciseId] = blueprint;
        this.daysToExerciseIdsMatrix[day].push(exerciseId);
        this.blueprintIdToExerciseIdMap[blueprint.id] = exerciseId;
        this.exercisesToProgressionMatrix[exerciseId] = progression;
    }

    updateTrainingMaxForBlueprint(blueprintId: string, newTrainingMax: number){
        const exerciseId = this.blueprintIdToExerciseIdMap[blueprintId];
        const progression = this.exercisesToProgressionMatrix[exerciseId];
        if (progression instanceof FixedProgression){
            progression.getAllSets().forEach(set => {
                if (set instanceof TMaxVaryingSet){
                    set.trainingMax = newTrainingMax
                }
            })
        }
    }

    getExerciseIdsForDay(day: number): string[]{
        return this.daysToExerciseIdsMatrix[day]
    }

    getSetsForExerciseInWeek(exerciseId: string, week: number): ExerciseSet[]{
        return this.exercisesToProgressionMatrix[exerciseId].getSetsAtWeek(week)
    }
}