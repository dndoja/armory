import BlockBlueprint from "./BlockBlueprint";
import {List} from "immutable";
import {ForgedProgram} from "../forged/ForgedProgram";
import ExerciseOverview, {ExerciseOverviewItem} from "../common/ExerciseOverview";
import {mapNTimes} from "../forged/Utilities";
import {forgeProgram} from "../forged/Forge";
import ExerciseBlueprint from "./ExerciseBlueprint";
import TMaxVaryingSet from "../workout_sets/TMaxVaryingSet";
import ExerciseWithProgression from "./ExerciseWithProgression";
import {updateTrainingMax} from "../transformations/ExerciseTransformations";

export default class ProgramBlueprint {
    readonly name: string;
    readonly blocks: List<BlockBlueprint>;

    constructor(name: string, ...blocks: BlockBlueprint[]) {
        this.name = name;
        this.blocks = List(blocks);
    }

    structured = (): ForgedProgram => forgeProgram(this);

    getExerciseOverview = (exerciseId: string): ExerciseOverview => {
        const overviewItemsInProgram: Array<ExerciseOverviewItem> = [];

        this.blocks.forEach((block, blockIndex) => {
            const exercise = block.getExerciseById(exerciseId);
            if (exercise) {
                const overviewItemsInBlock = mapNTimes(block.totalWeeks, week => {
                    return {block: blockIndex,week: week,sets: exercise.progression.getSetsAtWeek(week)}
                });
                overviewItemsInProgram.push(...overviewItemsInBlock)
            }
        });

        return new ExerciseOverview(exerciseId, 'Bench press', List(overviewItemsInProgram))
    };

    updateExerciseTrainingMax = (exerciseBlueprint: ExerciseBlueprint, newTrainingMax: number): ProgramBlueprint => {
        return {
            ...this,
            blocks: this.blocks.map(block => block.updateExercisesForBlueprint(exerciseBlueprint, exercise => updateTrainingMax(exercise, newTrainingMax)))
        }
    }
}