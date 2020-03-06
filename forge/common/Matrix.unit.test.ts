import Matrix, {createMatrix, flatten} from "./Matrix";

describe('Matrix', () => {
    describe('createMatrix', () => {
        it('should make a matrix with the correct size', () => {
            const size = 3;
            const matrix = createMatrix(size);
            expect(matrix.length).toBe(size);
        });

        it ('should make a matrix where all the children are defined', () => {
            const size = 3;
            const matrix: Matrix<any> = createMatrix(size);
            matrix.forEach(e => expect(e).toBeDefined);
        });
        
        it ('should make a zero sized matrix when the size argument is not defined', () => {
            const matrix = createMatrix();
            expect(matrix.length).toBe(0);
        })
    });
    
    describe('flatten', () => {
        it('should have the correct size', function () {
            const primaryDimensionSize = 3;
            const secondaryDimensionSize = 4;
            const matrix = createMatrix<string>(primaryDimensionSize);

            matrix.forEach(arr => {
                arr.push(...Array(secondaryDimensionSize).fill(""));
            });

            expect(flatten(matrix).length).toBe(primaryDimensionSize * secondaryDimensionSize)
        });
    })
});