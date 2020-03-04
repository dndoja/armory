import WorkoutSet from "./WorkoutSet";

class ExerciseOverview{
    id: string;
    name: string;
    sets: [string,WorkoutSet[]][];

    constructor(id: string,name: string, sets: [string,WorkoutSet[]][]) {
        this.name = name;
        this.sets = sets;
        this.id = id;
    }
}

export default ExerciseOverview;