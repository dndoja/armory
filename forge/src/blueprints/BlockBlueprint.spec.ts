import BlockBlueprint from "./BlockBlueprint";
import RigidProgression from "../progressions/RigidProgression";
import {mockExercise} from "../Mocks";
import {mapNTimes} from "../common/Utilities";

describe('BlockBlueprint', () => {
    const totalWeeks = 8;
    const trainingMax = 100;
    const mainExercise = mockExercise('main', trainingMax, totalWeeks);
    const dummyExercise = mockExercise('dummy',80,totalWeeks);
    const days = 3;

    const blockBlueprint = BlockBlueprint.make(totalWeeks,days,{exercise: mainExercise, day: 0}, {exercise: dummyExercise, day: 1});
    const exercisesAtDay1 = blockBlueprint.getExercisesForDay(0);
    const exercisesAtDay2 = blockBlueprint.getExercisesForDay(1);

    it('should create an empty block if no exercises are specified', () => {
        const emptyBlock = BlockBlueprint.make(8,days);
        for (let day = 0; day < days; day++) {
            expect(emptyBlock.getExercisesForDay(day).size).toBe(0)
        }
    });

    it('should return all of the exercise blueprints', () => {
        const blueprints = blockBlueprint.getExerciseBlueprints();
        expect(blueprints.size).toBe(2);
        expect(blueprints).toContain(mainExercise.blueprint);
        expect(blueprints).toContain(dummyExercise.blueprint)
    });

    it('should add an exercise and its\' sets correctly in a given day',() => {
        expect(exercisesAtDay1.get(0)).toEqual(mainExercise);
        expect(exercisesAtDay2.get(0)).toEqual(dummyExercise);
    });

    it('should correctly return all the exercises grouped by day', () => {
        const groupedByDay = blockBlueprint.getExercisesByDays();
        expect(groupedByDay.get(0)!.get(0)).toEqual(mainExercise);
        expect(groupedByDay.get(1)!.get(0)).toEqual(dummyExercise)
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
