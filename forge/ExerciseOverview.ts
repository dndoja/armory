import ExerciseSet from "@armory/forge/workout_sets/ExerciseSet";

class ExerciseOverview{
    id: string;
    name: string;
    sets: [string,ExerciseSet[]][];

    constructor(id: string,name: string, sets: [string,ExerciseSet[]][]) {
        this.name = name;
        this.sets = sets;
        this.id = id;
    }
}

export default ExerciseOverview;