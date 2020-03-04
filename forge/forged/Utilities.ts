import ExerciseSet from "../workout_sets/ExerciseSet";
import ExerciseOverview from "../ExerciseOverview";
import {ForgedProgram} from "./ForgedProgram";

/**
 * This function is very inefficient but the iteration count doesn't even reach 2000 so it doesn't really matter.
 */
export function getExerciseOverview(program: ForgedProgram, exerciseId: string) {
    const sets: [string,ExerciseSet[]][] = [];
    let name: string = undefined;
    program.blocks.forEach(block => {
        block.weeks.forEach((week,index) => {
            week.days.forEach(workout => {
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

