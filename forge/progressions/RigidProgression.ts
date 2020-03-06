import Progression from "./Progression";
import ExerciseSet from "../workout_sets/ExerciseSet";

export default class RigidProgression implements Progression{
    private readonly sets: ExerciseSet[];

    constructor(...sets: ExerciseSet[]) {
        this.sets = sets;
    }

    getAllSets = (): ExerciseSet[] => this.sets;

    getSetsAtWeek = this.getAllSets
}