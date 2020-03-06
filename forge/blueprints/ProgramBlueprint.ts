import ExerciseBlueprint from "./ExerciseBlueprint";
import BlockBlueprint from "./BlockBlueprint";

export default class ProgramBlueprint {
    name: string;
    exercisePool: {[blueprintId: string]: ExerciseBlueprint};
    blocks: BlockBlueprint[];
}