import BlockBlueprint from "./BlockBlueprint";
import RigidProgression from "../progressions/RigidProgression";
import {mockExercise} from "../Mocks";

describe('BlockBlueprint', () => {
    const day = 2;
    const totalWeeks = 8;
    const trainingMax = 100;
    const mainExercise = mockExercise('main', trainingMax, totalWeeks);
    const dummyExercise = mockExercise('dummy',80,totalWeeks);

    const blockBlueprint = BlockBlueprint.make(totalWeeks,3)
        .withExercise(mainExercise,day)
        .withExercise(dummyExercise,day);

    const exercisesAtDay = blockBlueprint.getExercisesForDay(day);

    it('should add an exercise and its\' sets correctly in a given day',() => {
        expect(exercisesAtDay.get(0)).toEqual(mainExercise);
    });

    it('should correctly return an exercise by it\'s id', () => {
        expect(blockBlueprint.getExerciseById(mainExercise.id)).toBe(mainExercise);
        expect(blockBlueprint.getExerciseById('1234')).toBeUndefined();
    });

    it('should return all of the exercises that follow the given blueprint', () => {
        const withPrimaryBlueprint = blockBlueprint.getExercisesForBlueprint(mainExercise.blueprint);
        expect(withPrimaryBlueprint.size).toBe(1);
        expect(withPrimaryBlueprint.get(0)).toBe(mainExercise)
    });

    it('should update correctly all of the exercises that follow the given blueprint', () => {
        const newProgression = new RigidProgression({reps:8, weight:100});
        const updated = blockBlueprint.updateExercisesForBlueprint(mainExercise.blueprint, exercise => { return {...exercise, progression: newProgression }});
        updated.getExercisesForBlueprint(mainExercise.blueprint).forEach(exercise => expect(exercise.progression).toBe(newProgression));
        updated.getExercisesForBlueprint(dummyExercise.blueprint).forEach(exercise => expect(exercise.progression).toBe(dummyExercise.progression))
    });
});
