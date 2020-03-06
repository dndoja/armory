import Progression from "./Progression";
import ExerciseSet from "../workout_sets/ExerciseSet";
import {List} from "immutable";

export default class RigidProgression implements Progression{
    private readonly sets: ExerciseSet[];

    constructor(...sets: ExerciseSet[]) {
        this.sets = sets;
    }

    getAllSets = (): ExerciseSet[] => this.sets;

    getSetsAtWeek = (week: number): List<ExerciseSet> => List(this.getAllSets());

    updateSets(transformation: (set: ExerciseSet) => {}): Progression {
        return new RigidProgression(...this.sets);
    }
}