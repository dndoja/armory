import Exercise from "../Exercise";
import ExerciseBlueprint from "./ExerciseBlueprint";
import BlockBlueprint from "./BlockBlueprint";

export function updateTrainingMaxes(old: ProgramBlueprint, ...trainingMaxes:[{exerciseId: string,trainingMax: number}]): ProgramBlueprint {

    return {...old}
}

export default class ProgramBlueprint {
    exercisePool: {[blueprintId: string]: ExerciseBlueprint};
    blocks: BlockBlueprint[];
}