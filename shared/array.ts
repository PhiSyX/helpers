import type { WHATEVER } from "./types.d.ts";

import { isNil } from "./lang.ts";

type ArrayRecordIndex = number;
type ArrayRecordEntry<T> = T;
type ArrayRecord<T> = [ArrayRecordEntry<T>, ArrayRecordIndex];

/**
 * Retourne une entrée aléatoire d'un tableau.
 */
export function randomEntry<ArrayType = WHATEVER>(
  arr: ArrayType[] = [],
): ArrayRecord<ArrayType> {
  const index = Math.floor(Math.random() * arr.length);
  return [arr[index], index];
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
