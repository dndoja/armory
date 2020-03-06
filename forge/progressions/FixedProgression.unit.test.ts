import ExerciseSet from "../workout_sets/ExerciseSet";
import Matrix, {flatten} from "../common/Matrix";
import {FixedProgression} from "./FixedProgression";

const mockSetsMatrix = (weeks: number) => {
    const matrix: Matrix<ExerciseSet> = new Matrix<ExerciseSet>();

    for (let i = 0; i < weeks; i++){
        matrix.push([{reps:1 + i,weight:100 + i}])
    }

    return matrix;
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
        expect(mockedSetsMatrix[targetWeek]).toEqual(setsAtWeek)
    });
});