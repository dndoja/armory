export const mapNTimes = <T>(n: number, action: (index: number) => T): Array<T> => Array(n).fill(0).map((_, index) => action(index));
