import ProgramBlueprint from "./blueprints/ProgramBlueprint";
import {ForgedWeek, ForgedDay, ForgedBlock, ForgedProgram} from "./forged/ForgedProgram";
import ForgedExercise from "./forged/ForgedExercise";
import BlockBlueprint from "./blueprints/BlockBlueprint";
import {makeMockedProgramBlueprint} from "./Mocks";

const forgeExercises = (blueprint: BlockBlueprint, day: number, week: number): ForgedExercise[] => {
    const exerciseIds = blueprint.getExerciseIdsForDay(day);
    return exerciseIds.map(id => {
        const sets = blueprint.getSetsForExerciseInWeek(id, week);
        return new ForgedExercise(id,"Exercise",sets)
    });
};

const forgeDays = (blueprint: BlockBlueprint, week: number): ForgedDay[] => {
    const days: ForgedDay[] = [];
    for (let day = 0; day < blueprint.trainingDaysPerWeek; day++){
        days.push({exercises: forgeExercises(blueprint,day,week)});
    }
    return days;
};

const forgeWeeks = (blueprint: BlockBlueprint): ForgedWeek[] => {
    const weeks: ForgedWeek[] = [];
    for (let week = 0; week < blueprint.trainingDaysPerWeek; week++){
        weeks.push({days: forgeDays(blueprint,week)});
    }
    return weeks;
};

const forgeBlock = (blueprint: BlockBlueprint): ForgedBlock => {
    return {weeks: forgeWeeks(blueprint)}
};

const forge = (programBlueprint?: ProgramBlueprint): ForgedProgram => {
    const blueprint = programBlueprint ? programBlueprint : makeMockedProgramBlueprint();
    const forgedBlocks = blueprint.blocks.map(blockBlueprint => forgeBlock(blockBlueprint));
    console.log(forgedBlocks);
    return {blocks: forgedBlocks};
};

export { forge };