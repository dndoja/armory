import ForgedSet from "./ForgedSet";
import Exercise from "../Exercise";
import ExerciseSet from "../workout_sets/ExerciseSet";

class ForgedExercise implements Exercise{
    id: string;
    name: string;
    sets: ExerciseSet[];

    constructor(id: string, name: string, sets: ExerciseSet[]) {
        this.name = name;
        this.sets = sets;
        this.id = id;
    }
}

export default ForgedExercise;