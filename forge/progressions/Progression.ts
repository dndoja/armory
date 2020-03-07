import ExerciseSet from "../workout_sets/ExerciseSet";
import {List} from "immutable";

export default interface Progression {
    getAllSets(): List<ExerciseSet>
    getSetsAtWeek(week: number): List<ExerciseSet>
    updateSets(transformation: (set: ExerciseSet) => {}): Progression
}