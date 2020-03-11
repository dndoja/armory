import ExerciseWithProgression from "../blueprints/ExerciseWithProgression";
import ExerciseBlueprint from "../blueprints/ExerciseBlueprint";
import RigidProgression from "../progressions/RigidProgression";
import TMaxVaryingSet from "../workout_sets/TMaxVaryingSet";
import ExerciseSet from "../workout_sets/ExerciseSet";
import {updateTrainingMax} from "./ExerciseTransformations";

describe("ExerciseTransformations", () => {
    describe("updateTrainingMax", () => {
        const originalTrainingMax = 120;
        const newTrainingMax = 140;
        const exerciseBlueprint = new ExerciseBlueprint('test', originalTrainingMax);
        const sets: Array<ExerciseSet> = [
            new TMaxVaryingSet(8, 120),
            new TMaxVaryingSet(8, 120),
            {reps: 9, weight: 100}
        ];
        const exercise = new ExerciseWithProgression(exerciseBlueprint, new RigidProgression(...sets));

        it('should update the training max of every TMaxVaryingSet', () => {
            const newExercise = updateTrainingMax(exercise, newTrainingMax);
            const tMaxVaryingSets = newExercise.progression.getAllSets().filter(set => set instanceof TMaxVaryingSet);
            tMaxVaryingSets.forEach(set => {
                const tMaxVaryingSet = set as TMaxVaryingSet;
                expect(tMaxVaryingSet.trainingMax).toBe(newTrainingMax);
                expect(tMaxVaryingSet.weight).toBe(newTrainingMax);
            })
        })
    });
});