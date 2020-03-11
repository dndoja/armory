import TMaxVaryingSet from "../workout_sets/TMaxVaryingSet";
import ExerciseWithProgression from "../blueprints/ExerciseWithProgression";

export const updateTrainingMax = (exercise: ExerciseWithProgression, newTrainingMax: number): ExerciseWithProgression => {
    const newProgression = exercise.progression.updateSets(set => {
        return set instanceof TMaxVaryingSet ? new TMaxVaryingSet(set.reps,newTrainingMax,set.multiplier) : set;
    });
    return new ExerciseWithProgression(exercise.blueprint, newProgression, exercise.id)
};