import ExerciseSet from "@armory/forge/src/workout_sets/ExerciseSet";
import {List} from "immutable";

type ExerciseOverviewItem = {
    week: number,
    block: number,
    sets: List<ExerciseSet>
}

export {ExerciseOverviewItem}

class ExerciseOverview{
    readonly id: string;
    readonly name: string;
    readonly items: List<ExerciseOverviewItem>;

    constructor(id: string, name: string, sets: List<ExerciseOverviewItem>) {
        this.name = name;
        this.items = sets;
        this.id = id;
    }
}

export default ExerciseOverview;