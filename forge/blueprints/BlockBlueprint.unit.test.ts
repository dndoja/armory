import ExerciseBlueprint from "./ExerciseBlueprint";
import BlockBlueprint, {updateTrainingMax} from "./BlockBlueprint";
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
        [new TMaxVaryingSet(5, trainingMax), {reps: 5,weight: 150}]));

describe('BlockBlueprint', () => {
    const exerciseName = 'squat';
    const day = 2;
    const trainingMax = 100;
    const progression = mockedProgression(trainingMax);
    const exerciseBlueprint = new ExerciseBlueprint(exerciseName,trainingMax);

    const blueprint = new BlockBlueprint(8,3)
        .withExercise(new ExerciseWithProgression(exerciseBlueprint,progression),day);

    const exercisesAtDay = blueprint.getExercisesForDay(day);
    const sets = blueprint.getExercisesForDay(day).get(0)!.progression.getSetsAtWeek(0);

    it('should add an exercise and its\' sets correctly in a given day',() => {
        expect(exercisesAtDay.get(0)).toBeDefined();
        expect(exercisesAtDay.get(0)?.name).toBe(exerciseName);
        expect(sets).toBe(progression.getSetsAtWeek(0));
    });

    describe('updateTrainingMaxForBlueprint', () => {
        it('should update the training max of TMaxDependent sets', () => {
            const newTrainingMax = 120;
            const updated = updateTrainingMax(blueprint,exerciseBlueprint, newTrainingMax);
            const sets = updated.getExercisesForDay(day).get(0)?.progression.getSetsAtWeek(0);
            expect(sets?.get(0)?.weight).toBe(newTrainingMax);
        });
    });
});
