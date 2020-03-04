import ProgramBlock from "./ProgramBlock";
import ExerciseOverview from "./ExerciseOverview";
import WorkoutSet from "./WorkoutSet";

/**
 * This function is very inefficient but the iteration count doesn't even reach 2000 so it doesn't really matter.
 */
export function getExerciseSummary(program: WorkoutProgram, exerciseId: string) {
    const sets: [string,WorkoutSet[]][] = [];
    let name: string = undefined;
    program.blocks.forEach(block => {
        block.weeks.forEach((week,index) => {
            week.workouts.forEach(workout => {
                const exercise = workout.exercises.find(exercise => exercise.id === exerciseId);
                if (exercise) {
                    name = exercise.name;
                    sets.push(["Week " + (index + 1), exercise.sets])
                }
            })
        })
    });
    if (!name){
        return null;
    }

    return new ExerciseOverview(exerciseId,name,sets)
}

export default class WorkoutProgram {
    blocks: ProgramBlock[];

    constructor(blocks: ProgramBlock[]) {
        this.blocks = blocks;
    }
}