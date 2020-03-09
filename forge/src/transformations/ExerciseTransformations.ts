import TMaxVaryingSet from "../workout_sets/TMaxVaryingSet";
import ExerciseWithProgression from "../blueprints/ExerciseWithProgression";

export const updateTrainingMax = (exercise: ExerciseWithProgression, newTrainingMax: number): ExerciseWithProgression => {
    const newProgression = exercise.progression.updateSets(set => {
        return set instanceof TMaxVaryingSet ? {...set, trainingMax: newTrainingMax} : set;
    });
    return new ExerciseWithProgression(exercise.blueprint, newProgression, exercise.id)
};