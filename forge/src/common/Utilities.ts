import {Set} from 'immutable'

export const mapNTimes = <T>(n: number, action: (index: number) => T): Array<T> => Array(n).fill(0).map((_, index) => action(index));

export const pushOrSet = <K,V>(obj: Map<K,Set<V>>, key: K, value: V) => {
    const valueAtKey = obj.get(key);
    const newValue = valueAtKey ? valueAtKey.add(value) : Set.of(value);
    obj.set(key,newValue)
};