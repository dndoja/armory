import Progression from "./Progression";
import ExerciseSet from "../workout_sets/ExerciseSet";
import {List} from "immutable";

export default class RigidProgression implements Progression{
    private readonly sets: List<ExerciseSet>;

    constructor(...sets: ExerciseSet[]) {
        this.sets = List(sets);
    }

    getAllSets = (): List<ExerciseSet> => this.sets;

    getSetsAtWeek = (week: number): List<ExerciseSet> => List(this.getAllSets());

    updateSets = (transformation: (set: ExerciseSet) => ExerciseSet): Progression => new RigidProgression(...this.sets.map(set => transformation(set)));
}