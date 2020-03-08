import {List} from "immutable";

export const createMatrix = <T>(...values: T[][]): Matrix<T> => List<List<T>>(values.map(arr => List(arr)));

export const flatten = <T>(matrix: Matrix<T>): List<T> => matrix.flatMap(value => value);

type Matrix<T> = List<List<T>>

export default Matrix