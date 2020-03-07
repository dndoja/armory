import {List} from "immutable";

export const createMatrix = <T>(...values: T[][]): Matrix<T> => List<List<T>>(values.map(arr => List(arr)));

export const flatten = <T>(matrix: Matrix<T>): List<T> => matrix.flatMap(value => value);

export function setMatrixRow<T>(matrix: Matrix<T>, value: List<T>, rowIndex: number) {
    return matrix.set(rowIndex,value)
}

export function pushToRow<T>(matrix: Matrix<T>, rowIndex: number,...values: T[]): Matrix<T>{
    const row = matrix.get(rowIndex, List());
    return setMatrixRow(matrix,row.push(...values),rowIndex);
}

type Matrix<T> = List<List<T>>

export default Matrix