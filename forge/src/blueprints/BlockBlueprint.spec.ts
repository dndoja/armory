import ExerciseBlueprint from "./ExerciseBlueprint";
import BlockBlueprint from "./BlockBlueprint";
import RigidProgression from "../progressions/RigidProgression";
import Progression from "../progressions/Progression";
import {FixedProgression} from "../progressions/FixedProgression";
import TMaxVaryingSet from "../workout_sets/TMaxVaryingSet";
import {createMatrix} from "../common/Matrix";
import ExerciseWithProgression from "./ExerciseWithProgression";

const mockedProgression = (trainingMax: number): Progression => new FixedProgression(
    createMatrix(
        [new TMaxVaryingSet(5, trainingMax), {reps: 5,weight: 150}],
        [new TMaxVaryingSet(5, trainingMax), {reps: 5,weight: 150}],
        [new TMaxVaryingSet(5, trainingMax), {reps: 5,weight: 150}],
        [new TMaxVaryingSet(5, trainingMax), {reps: 5,weight: 150}]
    )
);

describe('BlockBlueprint', () => {
    const exerciseName = 'squat';
    const day = 2;
    const trainingMax = 100;
    const originalProgression = mockedProgression(trainingMax);
    const primaryExerciseId = 'primary';
    const primaryExerciseBlueprint = new ExerciseBlueprint(exerciseName,trainingMax);
    const primaryExercise = new ExerciseWithProgression(primaryExerciseBlueprint,originalProgression,primaryExerciseId);
    const secondaryExerciseBlueprint = new ExerciseBlueprint('bad',trainingMax);

    const blockBlueprint = BlockBlueprint.make(8,3)
        .withExercise(primaryExercise,day)
        .withExercise(new ExerciseWithProgression(secondaryExerciseBlueprint,originalProgression),day);

    const exercisesAtDay = blockBlueprint.getExercisesForDay(day);
    const sets = blockBlueprint.getExercisesForDay(day).get(0)!.progression.getSetsAtWeek(0);

    it('should add an exercise and its\' sets correctly in a given day',() => {
        expect(exercisesAtDay.get(0)).toBeDefined();
        expect(exercisesAtDay.get(0)!.name).toBe(exerciseName);
        expect(sets).toBe(originalProgression.getSetsAtWeek(0));
    });

    it('should correctly return an exercise by it\'s id', () => {
        expect(blockBlueprint.getExerciseById(primaryExerciseId)).toBe(primaryExercise);
        expect(blockBlueprint.getExerciseById('1234')).toBeUndefined();
    });

    it('should return all of the exercises that follow the given blueprint', () => {
        const withPrimaryBlueprint = blockBlueprint.getExercisesForBlueprint(primaryExerciseBlueprint);
        expect(withPrimaryBlueprint.size).toBe(1);
        expect(withPrimaryBlueprint.get(0)!.id).toBe(primaryExerciseId)
    });

    it('should update correctly all of the exercises that follow the given blueprint', () => {
        const newProgression = new RigidProgression({reps:8, weight:100});
        const updated = blockBlueprint.updateExercisesForBlueprint(primaryExerciseBlueprint, exercise => { return {...exercise, progression: newProgression }});
        updated.getExercisesForBlueprint(primaryExerciseBlueprint).forEach(exercise => expect(exercise.progression).toBe(newProgression));
        updated.getExercisesForBlueprint(secondaryExerciseBlueprint).forEach(exercise => expect(exercise.progression).toBe(originalProgression))
    });
});
