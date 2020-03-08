import ProgramBlueprint from "../blueprints/ProgramBlueprint";
import {ForgedBlock, ForgedDay, ForgedProgram, ForgedWeek} from "./ForgedProgram";
import {makeMockedProgramBlueprint} from "../Mocks";
import BlockBlueprint from "../blueprints/BlockBlueprint";
import {List} from "immutable";
import ForgedExercise from "./ForgedExercise";
import {mapNTimes} from "./Utilities";

const forgeExercises = (blueprint: BlockBlueprint, day: number, week: number): List<ForgedExercise> => {
    return blueprint.getExercisesForDay(day).map(exercise => {
        const sets = exercise.progression.getSetsAtWeek(week);
        return new ForgedExercise(exercise.id,exercise.name,sets)
    });
};

const forgeDays = (blueprint: BlockBlueprint, week: number): List<ForgedDay> => {
    return List(mapNTimes(blueprint.trainingDaysPerWeek, day => {
        return {exercises: forgeExercises(blueprint,day,week)}
    }));
};

const forgeWeeks = (blueprint: BlockBlueprint): List<ForgedWeek> => {
    return List(mapNTimes(blueprint.totalWeeks, week => {
        return {days: forgeDays(blueprint,week)}
    }));
};

const forgeBlock = (blueprint: BlockBlueprint): ForgedBlock => {
    return {weeks: forgeWeeks(blueprint)}
};

const forgeProgram = (programBlueprint?: ProgramBlueprint): ForgedProgram => {
    const blueprint = programBlueprint ? programBlueprint : makeMockedProgramBlueprint();
    return blueprint.structured()
};

export { forgeProgram };