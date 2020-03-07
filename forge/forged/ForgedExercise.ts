import ForgedSet from "./ForgedSet";
import Exercise from "../Exercise";
import ExerciseSet from "../workout_sets/ExerciseSet";
import BodyPart from "../common/BodyPart";

class ForgedExercise implements Exercise{
    readonly id: string;
    readonly name: string;
    readonly sets: ExerciseSet[];
    readonly targetedBodyParts: BodyPart[];


    constructor(id: string, name: string, sets: ExerciseSet[], targetedBodyParts: BodyPart[] = []) {
        this.id = id;
        this.name = name;
        this.sets = sets;
        this.targetedBodyParts = targetedBodyParts;
    }
}

export default ForgedExercise;