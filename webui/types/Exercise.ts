import WorkoutSet from "./WorkoutSet";

class Exercise{
    id: string;
    name: string;
    sets: WorkoutSet[];

    constructor(id: string, name: string, sets: WorkoutSet[]) {
        this.name = name;
        this.sets = sets;
        this.id = id;
    }
}

export default Exercise;