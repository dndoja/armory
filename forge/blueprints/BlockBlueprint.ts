import Exercise from "../Exercise";
import Progression from "../progressions/Progression";
import ExerciseBlueprint from "./ExerciseBlueprint";
import {v4 as uuid} from 'uuid';
import TMaxVaryingSet from "../workout_sets/TMaxVaryingSet";
import {FixedProgression} from "../progressions/FixedProgression";
import {IdMap} from "../common/IdMap";
import Matrix, {createMatrix, pushToRow} from "../common/Matrix";
import ExerciseSet from "../workout_sets/ExerciseSet";
import {List, Map} from "immutable";
import {instanceOf} from "prop-types";

export default class BlockBlueprint {
    readonly totalWeeks: number;
    readonly trainingDaysPerWeek: number;
    private blueprintIdToExerciseIdMap: Map<string,Exercise[]>;
    private daysToExerciseIdsMatrix: Matrix<Exercise>;
    private exercisesMap: IdMap<Exercise>;
    private exercisesToProgressionMap: IdMap<Progression>;

    constructor(totalWeeks: number, trainingDaysPerWeek: number) {
        this.totalWeeks = totalWeeks;
        this.trainingDaysPerWeek = trainingDaysPerWeek;
        this.daysToExerciseIdsMatrix = createMatrix();
        this.blueprintIdToExerciseIdMap = Map();
        this.exercisesMap = {};
        this.exercisesToProgressionMap = {};
    }

    addExerciseForDay(blueprint: ExerciseBlueprint, day: number, progression: Progression) {
        const exerciseId = uuid();
        const exercise = {id: exerciseId, name: blueprint.name};
        this.exercisesMap[exerciseId] = blueprint;
        this.daysToExerciseIdsMatrix = pushToRow(this.daysToExerciseIdsMatrix,exercise,day);
        this.blueprintIdToExerciseIdMap = this.blueprintIdToExerciseIdMap.set(blueprint.id, [...this.blueprintIdToExerciseIdMap.get(blueprint.id,[]),exercise]);
        this.exercisesToProgressionMap[exerciseId] = progression;
    }

    updateTrainingMaxForBlueprint(blueprintId: string, newTrainingMax: number){
        const exercises: Exercise[] = this.blueprintIdToExerciseIdMap.get(blueprintId);

        exercises.forEach(exercise => {
            const progression = this.exercisesToProgressionMap[exercise.id];
            this.exercisesToProgressionMap[exercise.id] = progression.updateSets(set => {
                if (set instanceof TMaxVaryingSet){
                    return new TMaxVaryingSet(set.reps,newTrainingMax,set.multiplier)
                }else{
                    return set
                }
            })
        })
    }

    getExercisesForDay = (day: number): List<Exercise> => this.daysToExerciseIdsMatrix.get(day);

    getSetsForExerciseInWeek(exerciseId: string, week: number): List<ExerciseSet>{
        return this.exercisesToProgressionMap[exerciseId].getSetsAtWeek(week)
    }
}