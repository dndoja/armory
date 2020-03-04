import ExerciseSet from "../workout_sets/ExerciseSet";

export default interface Progression {
    getSetsAtWeek(week: number): ExerciseSet[]
}