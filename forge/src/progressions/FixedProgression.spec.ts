import ExerciseSet from "../workout_sets/ExerciseSet";
import Matrix, {createMatrix, flatten} from "../common/Matrix";
import {FixedProgression} from "./FixedProgression";
import {mapNTimes} from "../common/Utilities";

const mockSetsMatrix = (weeks: number) => {
    const allSets = mapNTimes(weeks,week => {return[{reps: 1 + week, weight: 100 + week}]});
    return createMatrix<ExerciseSet>(...allSets);
};

describe('Fixed progression', () => {
    const weeks = 8;
    const mockedSetsMatrix = mockSetsMatrix(weeks);
    const progression = new FixedProgression(mockedSetsMatrix);

    describe('getAllSets', () => {
        it('should return all of the sets', () => {
            expect(progression.getAllSets()).toEqual(flatten(mockedSetsMatrix));
        });
    });

    it('should return the correct sets for the given week', () => {
        const targetWeek = weeks - 1;
        const setsAtWeek = progression.getSetsAtWeek(targetWeek);
        expect(mockedSetsMatrix.get(targetWeek)).toEqual(setsAtWeek)
    });

    it('should update all of the sets correctly', () => {
        const newWeight = 111;
        const updated = progression.updateSets(set => {return {...set, weight: newWeight}});
        updated.getAllSets().forEach(set => expect(set.weight).toBe(newWeight))
    })
});