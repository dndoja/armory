import Exercise from "../common/Exercise";
import ExerciseSet from "../workout_sets/ExerciseSet";
import BodyPart from "../common/BodyPart";
import {List} from "immutable";

export default class TimelineExercise implements Exercise{
    readonly id: string;
    readonly name: string;
    readonly sets: List<ExerciseSet>;
    readonly targetedBodyParts: BodyPart[];

    constructor(id: string, name: string, sets: List<ExerciseSet>, targetedBodyParts: BodyPart[] = []) {
        this.id = id;
        this.name = name;
        this.sets = sets;
        this.targetedBodyParts = targetedBodyParts;
    }
}
