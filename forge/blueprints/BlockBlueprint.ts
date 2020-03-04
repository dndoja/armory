import Exercise from "../Exercise";
import Progression from "../progressions/Progression";
import ExerciseBlueprint from "./ExerciseBlueprint";
import {v4 as uuid} from 'uuid';
import TMaxVaryingSet from "../workout_sets/TMaxVaryingSet";
import {FixedProgression} from "../progressions/FixedProgression";
import {IdMap} from "../common/IdMap";
import Matrix, {createMatrix} from "../common/Matrix";

export default class BlockBlueprint {
    readonly totalWeeks: number;
    readonly trainingDaysPerWeek: number;
    private readonly blueprintIdToExerciseIdMap: Matrix<string>;
    private readonly daysToExerciseIdsMap: Matrix<string>;
    private readonly exercisesMap: IdMap<Exercise>;
    private readonly exercisesToProgressionMap: IdMap<Progression>;

    constructor(totalWeeks: number, trainingDaysPerWeek: number) {
        this.totalWeeks = totalWeeks;
        this.trainingDaysPerWeek = trainingDaysPerWeek;
        this.daysToExerciseIdsMap = createMatrix(trainingDaysPerWeek);
        this.blueprintIdToExerciseIdMap = createMatrix();
        this.exercisesMap = {};
        this.exercisesToProgressionMap = {};
    }

    public log(){
        console.log(this.exercisesToProgressionMap)
    }

    public addExerciseForDay(blueprint: ExerciseBlueprint, day: number, progression: Progression) {
        const id = uuid();
        this.exercisesMap[id] = blueprint;
        this.daysToExerciseIdsMap[day].push(id);
        this.blueprintIdToExerciseIdMap[blueprint.id] = id;
        this.exercisesToProgressionMap[id] = progression;
    }

    public updateTrainingMaxForBlueprint(blueprintId: string, newTrainingMax: number){
        const exerciseId = this.blueprintIdToExerciseIdMap[blueprintId];
        const progression = this.exercisesToProgressionMap[exerciseId];
        if (progression instanceof FixedProgression){
            progression.getAllSets().forEach(set => {
                if (set instanceof TMaxVaryingSet){
                    set.trainingMax = newTrainingMax
                }
            })
        }
    }
}