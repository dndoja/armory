import BlockBlueprint from "./BlockBlueprint";
import {List} from "immutable";
import {ForgedProgram} from "../forged/ForgedProgram";
import ExerciseOverview, {ExerciseOverviewItem} from "../common/ExerciseOverview";
import {mapNTimes} from "../forged/Utilities";
import {forgeProgram} from "../forged/Forge";

export default class ProgramBlueprint {
    readonly name: string;
    readonly blocks: List<BlockBlueprint>;

    constructor(name: string, blocks: List<BlockBlueprint>) {
        this.name = name;
        this.blocks = blocks;
    }

    structured = (): ForgedProgram => forgeProgram(this);

    getExerciseOverview = (exerciseId: string): ExerciseOverview => {
        const allSets: Array<ExerciseOverviewItem> = [];

        this.blocks.forEach(block => {
            const exercise = block.getExerciseById(exerciseId);
            if (exercise) {
                const sets = mapNTimes(block.totalWeeks, week => {
                    return {identifier: 'Week ' + (week + 1), sets: exercise.progression.getSetsAtWeek(week)}
                });
                allSets.push(...sets)
            }
        });

        return new ExerciseOverview(exerciseId, 'Bench press', List(allSets))
    };
}