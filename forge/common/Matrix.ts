import {List} from "immutable";

export const createMatrix = <T>(...values: T[][]): Matrix<T> => List<List<T>>(values.map(arr => List(arr)));

export const flatten = <T>(matrix: Matrix<T>): Array<T> => [].concat(...matrix);

export function pushToRow<T>(matrix: Matrix<T>, value: T, rowIndex: number): Matrix<T>{
    const mutatedMatrix = matrix.get(rowIndex) ? matrix : matrix.set(rowIndex, List());
    const mutatedRow = mutatedMatrix.get(rowIndex).push(value);
    return mutatedMatrix.set(rowIndex,mutatedRow)
}



type Matrix<T> = List<List<T>>

export default Matrix
//export default class Matrix<T> extends Array<Array<T>>{}