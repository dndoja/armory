import ExerciseBlueprint from "./blueprints/ExerciseBlueprint";
import {FixedProgression} from "./progressions/FixedProgression";
import {mapNTimes} from "./common/Utilities";
import {createMatrix} from "./common/Matrix";
import TMaxVaryingSet from "./workout_sets/TMaxVaryingSet";
import ExerciseWithProgression from "./blueprints/ExerciseWithProgression";
import BlockBlueprint from "./blueprints/BlockBlueprint";
import ProgramBlueprint from "./blueprints/ProgramBlueprint";

export const mockExercise = (name: string, trainingMax: number, weeksPerformedFor: number, id?: string) => new ExerciseWithProgression(
    new ExerciseBlueprint(name, trainingMax),
    mockFixedProgression(weeksPerformedFor, trainingMax),
    id
);

export const mockFixedProgression = (weeks: number, trainingMax: number): FixedProgression => new FixedProgression(
    createMatrix(...mapNTimes(weeks, () => [
        new TMaxVaryingSet(8, trainingMax),
        new TMaxVaryingSet(8, trainingMax),
        new TMaxVaryingSet(8, trainingMax),
        new TMaxVaryingSet(8, trainingMax),
        {reps: 8, weight: 80}
    ]))
);

export const mockBlock = (weeks: number, trainingDaysPerWeek: number): BlockBlueprint => {
    const exercisesInDays = mapNTimes(trainingDaysPerWeek, () => mapNTimes(6, i => mockExercise('Exercise ' + i, (i + 1) * 20, weeks)));
    const flat: Array<{ exercise: ExerciseWithProgression, day: number }> = [];
    exercisesInDays.forEach((exercises, index) => {
        flat.push(...exercises.map(e => {
            return {exercise: e, day: index}
        }))
    });
    return BlockBlueprint.make(weeks, trainingDaysPerWeek, ...flat);
};

export const mockProgram = (name: string, blocks: number = 1, weeksPerBlock: number, daysPerWeek: number): ProgramBlueprint => new ProgramBlueprint(
    name,
    ...mapNTimes(blocks, () => mockBlock(weeksPerBlock,daysPerWeek))
);