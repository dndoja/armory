import Matrix, {createMatrix, flatten} from "./Matrix";

describe('Matrix', () => {
    describe('createMatrix', () => {
        it ('should make a zero sized matrix when the size argument is not defined', () => {
            const matrix = createMatrix();
            expect(matrix.size).toBe(0);
        })
    });
    
    describe('flatten', () => {

    })
});