import Exercise from "./Exercise";

class Workout {
    exercises: Exercise[];

    constructor(exercises: Exercise[]) {
        this.exercises = exercises;
    }
}

export default Workout;