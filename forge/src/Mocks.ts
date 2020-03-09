import ExerciseBlueprint from "./blueprints/ExerciseBlueprint";
import {FixedProgression} from "./progressions/FixedProgression";
import {mapNTimes} from "./forged/Utilities";
import {createMatrix} from "./common/Matrix";
import TMaxVaryingSet from "./workout_sets/TMaxVaryingSet";
import ExerciseWithProgression from "./blueprints/ExerciseWithProgression";

export const mockExercise = (name: string, trainingMax: number, weeksPerformedFor: number, id?: string) => new ExerciseWithProgression(
    new ExerciseBlueprint(name,trainingMax),
    mockFixedProgression(weeksPerformedFor, trainingMax),
    id
);

export const mockFixedProgression = (weeks: number, trainingMax: number): FixedProgression => new FixedProgression(
    createMatrix(...mapNTimes(weeks,() => [
        new TMaxVaryingSet(8,trainingMax),
        {reps:8, weight: 80}
    ]))
);

