import type { OBJECT, WHATEVER } from "./types.d.ts";

import { isNil, isUndefined } from "./lang.ts";

type ArrayRecordIndex = number;
type ArrayRecordEntry<T> = T;
type ArrayRecord<T> = [ArrayRecordEntry<T>, ArrayRecordIndex];

export function chunkArray<ArrayType = WHATEVER>(
  arr: ArrayType[],
  size: number,
): Array<ArrayType[]> {
  const reducer = (
    segments: Array<ArrayType[]>,
    _: ArrayType,
    idx: number,
  ): Array<ArrayType[]> => {
    if (idx % size === 0) {
      const newArr = arr.slice(idx, idx + size);
      return [...segments, newArr] as Array<ArrayType[]>;
    }

    return segments;
  };

  return arr.reduce(reducer, []);
}

/**
 * Retourne une entrée aléatoire d'un tableau.
 */
export function randomEntry<ArrayType = WHATEVER>(
  arr: ArrayType[] = [],
): ArrayRecord<ArrayType> | [null, null] {
  const index = Math.floor(Math.random() * arr.length);
  const entry = arr[index];
  return !isUndefined(entry) ? [entry, index] : [null, null];
}

/**
 * Retourne la première entrée d'un tableau, s'il y a des entrées.
 */
export function firstEntry<ArrayType = WHATEVER>(
  arr: ArrayType[],
): ArrayRecord<ArrayType> | [null, null] {
  const index = 0;
  const entry = arr[0];
  return !isNil(entry) ? [entry, index] : [null, null];
}

/**
 * Retourne la dernière entrée d'un tableau, s'il y a des entrées.
 */
export function lastEntry<ArrayType = WHATEVER>(
  arr: ArrayType[],
): ArrayRecord<ArrayType> | [null, null] {
  const index = arr.length - 1;
  const entry = arr[index];
  return !isNil(entry) ? [entry, index] : [null, null];
}

export function pluckCollect<ReturnType>(
  arr: OBJECT[],
  propName: string,
): ReturnType[] {
  return arr.map((obj) => obj[propName]).filter(Boolean);
}
