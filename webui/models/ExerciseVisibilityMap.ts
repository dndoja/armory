import ProgramBlueprint from "@armory/forge/src/blueprints/ProgramBlueprint";

interface ExerciseVisibilityMap {
    [key:string]: {visible: boolean, name: string}
}

export function fromProgramBlueprint(program: ProgramBlueprint): ExerciseVisibilityMap {
    const visibilityMap: ExerciseVisibilityMap = {};

    program.blocks.forEach(block => {
        for (let day = 0; day < block.trainingDaysPerWeek; day++){
            block.getExercisesForDay(day).forEach(exercise => visibilityMap[exercise.id] = {visible: true,name: exercise.name})
        }
    });

    return visibilityMap;
}

export default ExerciseVisibilityMap;