import {ForgedProgram} from "@armory/forge/src/forged/ForgedProgram";

interface ExerciseVisibilityMap {
    [key:string]: {visible: boolean, name: string}
}

export function fromProgram(program: ForgedProgram): ExerciseVisibilityMap {
    const visibilityMap: ExerciseVisibilityMap = {};
    program.blocks.forEach(block => {
        block.weeks.forEach(week => week.days.forEach(workout => {
            workout.exercises.forEach(exercise => {
                visibilityMap[exercise.id] = {visible:true,name:exercise.name};
            })
        }))});

    return visibilityMap;
}

export default ExerciseVisibilityMap;