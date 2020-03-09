import ExerciseBlueprint from "./ExerciseBlueprint";
import {List, Map, Set} from "immutable";
import ExerciseWithProgression from "./ExerciseWithProgression";
import TMaxVaryingSet from "../workout_sets/TMaxVaryingSet";

export default class BlockBlueprint {
    readonly totalWeeks: number;
    readonly trainingDaysPerWeek: number;
    private readonly exercisesMap: Map<string, ExerciseWithProgression>;
    private readonly blueprintToExerciseIdsMap: Map<ExerciseBlueprint, Set<string>>;
    private readonly daysToExerciseIdsMatrix: Map<number, Set<string>>;

    private constructor(
        totalWeeks: number,
        trainingDaysPerWeek: number,
        exercisesMap: Map<string, ExerciseWithProgression> = Map(),
        blueprintToExercisesMap: Map<ExerciseBlueprint, Set<string>> = Map(),
        daysToExercisesMatrix: Map<number, Set<string>> = Map()
    ) {
        this.totalWeeks = totalWeeks;
        this.trainingDaysPerWeek = trainingDaysPerWeek;
        this.exercisesMap = exercisesMap;
        this.blueprintToExerciseIdsMap = blueprintToExercisesMap;
        this.daysToExerciseIdsMatrix = daysToExercisesMatrix;
    }

    static make = (totalWeeks: number, trainingDaysPerWeek: number): BlockBlueprint => new BlockBlueprint(totalWeeks,trainingDaysPerWeek);

    withExercise = (exerciseWithProgression: ExerciseWithProgression, day: number): BlockBlueprint => {
        const exerciseId = exerciseWithProgression.id;

        const newExercises = this.exercisesMap.set(exerciseId, exerciseWithProgression);
        const newExercisesAtDay = this.daysToExerciseIdsMatrix.get(day, Set()).add(exerciseId);

        const exerciseBlueprint = exerciseWithProgression.blueprint;
        const oldBlueprintToExercisesMap = this.blueprintToExerciseIdsMap.get(exerciseBlueprint, Set());
        const newBlueprintToExercisesMap = this.blueprintToExerciseIdsMap.set(exerciseBlueprint, oldBlueprintToExercisesMap.add(exerciseId));

        return new BlockBlueprint(this.totalWeeks, this.trainingDaysPerWeek, newExercises, newBlueprintToExercisesMap, this.daysToExerciseIdsMatrix.set(day, newExercisesAtDay));
    };

    private getExercisesByIds = (exerciseIds: Set<string>): List<ExerciseWithProgression> => List(exerciseIds.map(exerciseId => this.exercisesMap.get(exerciseId)!));

    private getExerciseIdsForDay = (day: number): Set<string> => this.daysToExerciseIdsMatrix.get(day, Set());

    private getExerciseIdsForBlueprint = (blueprint: ExerciseBlueprint): Set<string> => this.blueprintToExerciseIdsMap.get(blueprint, Set());

    private updateExercisesByIds = (exercisesToBeModified: Set<string>, transformation: (exercise: ExerciseWithProgression) => ExerciseWithProgression) => {
        const newExercisesMap = this.exercisesMap.map((exercise, id) => exercisesToBeModified.has(id) ? transformation(exercise) : exercise);
        return new BlockBlueprint(this.totalWeeks, this.trainingDaysPerWeek, newExercisesMap, this.blueprintToExerciseIdsMap, this.daysToExerciseIdsMatrix)
    };

    getExerciseById = (id: string): ExerciseWithProgression | undefined => this.exercisesMap.get(id);

    getExercisesForDay = (day: number): List<ExerciseWithProgression> => this.getExercisesByIds(this.getExerciseIdsForDay(day));

    getExercisesForBlueprint = (blueprint: ExerciseBlueprint): List<ExerciseWithProgression> => this.getExercisesByIds(this.getExerciseIdsForBlueprint(blueprint));

    updateExercisesForBlueprint = (blueprint: ExerciseBlueprint, transformation: (exercise: ExerciseWithProgression) => ExerciseWithProgression): BlockBlueprint => {
        const exercisesToBeModified = this.getExerciseIdsForBlueprint(blueprint);
        return this.updateExercisesByIds(exercisesToBeModified, transformation)
    };
};