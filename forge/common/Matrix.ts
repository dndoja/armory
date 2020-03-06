export function createMatrix<T>(size?: number): Matrix<T> {
    if (!size){
        return new Matrix<T>()
    }

    const matrix = new Matrix<T>(size);
    for (let i = 0; i < matrix.length; i++){
        matrix[i] = []
    }
    return matrix
}

export function flatten<T>(matrix: Matrix<T>): Array<T> {
    return [].concat(...matrix);
}

export default class Matrix<T> extends Array<Array<T>>{}