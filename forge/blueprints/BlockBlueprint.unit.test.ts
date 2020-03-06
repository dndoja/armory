import ExerciseBlueprint from "./ExerciseBlueprint";
import BlockBlueprint from "./BlockBlueprint";
import RigidProgression from "../progressions/RigidProgression";
import Progression from "../progressions/Progression";
import {FixedProgression} from "../progressions/FixedProgression";
import TMaxVaryingSet from "../workout_sets/TMaxVaryingSet";

const mockedProgression = (trainingMax: number): Progression => new FixedProgression([[
    new TMaxVaryingSet(5, trainingMax),
    {reps: 5,weight: 150}
]]);

describe('BlockBlueprint', () => {
    const exerciseName = 'squat';
    const day = 2;
    const blueprint = new BlockBlueprint(8,3);
    const trainingMax = 100;
    const progression = mockedProgression(trainingMax);
    const exerciseBlueprint = new ExerciseBlueprint(exerciseName,trainingMax);

    blueprint.addExerciseForDay(exerciseBlueprint,day,progression);

    const exercisesAtDay = blueprint.getExercisesForDay(day);
    const sets = blueprint.getSetsForExerciseInWeek(exercisesAtDay[0].id,0);

    it('should add an exercise and its\' sets correctly in a given day',() => {
        expect(exercisesAtDay.length).toBe(1);
        expect(exercisesAtDay[0].name).toBe(exerciseName);
        expect(sets).toBe(progression.getSetsAtWeek(0));
    });

    describe('updateTrainingMaxForBlueprint', () => {
        it('should update the training max of TMaxDependent sets', () => {
            const newTrainingMax = 120;
            blueprint.updateTrainingMaxForBlueprint(exerciseBlueprint.id, newTrainingMax);
            expect(sets[0].weight).toBe(newTrainingMax);
        });

        it ('should not affect of non TMaxDependent sets', () => {
            const oldWeight = sets[1].weight;
            blueprint.updateTrainingMaxForBlueprint(exerciseBlueprint.id, 300);
            expect(sets[1].weight).toBe(oldWeight);
        });
    });
});
