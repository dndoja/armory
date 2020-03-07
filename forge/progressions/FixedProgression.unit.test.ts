import ExerciseSet from "../workout_sets/ExerciseSet";
import Matrix, {createMatrix, flatten} from "../common/Matrix";
import {FixedProgression} from "./FixedProgression";

const mockSetsMatrix = (weeks: number) => {
    const allSets = Array(weeks).fill(0).map((_,i) => {return[{reps: 1 + 1, weight: 100 + i}]});
    return createMatrix<ExerciseSet>(...allSets);
};

describe('Fixed progression', () => {
    describe('getAllSets', () => {
        it('should contain all the sets', () => {
            const mockedSetsMatrix = mockSetsMatrix(8);
            const progression = new FixedProgression(mockedSetsMatrix);
            expect(progression.getAllSets()).toEqual(flatten(mockedSetsMatrix));
        });
    });

    it('should get the correct sets at the given week', () => {
        const weeks = 8;
        const targetWeek = weeks - 1;
        const mockedSetsMatrix = mockSetsMatrix(weeks);
        const progression = new FixedProgression(mockedSetsMatrix);
        const setsAtWeek = progression.getSetsAtWeek(targetWeek);
        expect(mockedSetsMatrix.get(targetWeek)).toEqual(setsAtWeek)
    });
});