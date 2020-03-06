import ExerciseSet from "../workout_sets/ExerciseSet";

export default interface Progression {
    getAllSets(): ExerciseSet[]
    getSetsAtWeek(week: number): ExerciseSet[]
}