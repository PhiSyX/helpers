import type { OBJECT } from "./types.d.ts";

import { lastEntry } from "./array.ts";
import { higherOrderFunction } from "./utils.ts";

type FuzzySearchRecordType =
  | "HIT"
  | "TEXT";

export interface FuzzySearchRecord {
  type: FuzzySearchRecordType;
  word: string;
}

const pushToResult = higherOrderFunction((
  arr: FuzzySearchRecord[],
  word: string,
  type: FuzzySearchRecordType,
) => {
  if (!word || !word.length) return arr;

  const [last] = lastEntry(arr);
  if (last && last.type === type) {
    return [...arr.slice(0, -1), { type, word: last.word + word }];
  }

  return [...arr, { type, word }];
});

/**
 *  Simple fuzzy search.
 */
export function fuzzySearch(
  needle: string,
  haystack: string,
): FuzzySearchRecord[] {
  const searchLen = needle.length;
  const inStrLen = haystack.length;

  let patternIndex = 0;
  let strIndex = 0;

  let matches: FuzzySearchRecord[] = [];

  while (patternIndex !== searchLen && strIndex !== inStrLen) {
    const patternChar = needle.charAt(patternIndex);
    const strChar = haystack.charAt(strIndex);
    const push = pushToResult(matches)(strChar);
    if (
      patternChar === strChar ||
      patternChar.toLowerCase() === strChar.toLowerCase()
    ) {
      ++patternIndex;
      matches = push("HIT");
    } else {
      matches = push("TEXT");
    }
    ++strIndex;
  }

  matches = pushToResult(matches)(haystack.slice(strIndex))("TEXT");

  return searchLen !== 0 && inStrLen !== 0 && patternIndex === searchLen
    ? matches
    : [];
}

/**
 * @see https://fr.wikipedia.org/wiki/Algorithme_de_Boyer-Moore-Horspool
 */
export function mooreSearch(
  needle: string,
  haystack: string,
): number {
  const setTable = (pattern: string) => {
    const chars: OBJECT<number> = {};
    for (let i = 0; i < pattern.length; i++) {
      chars[pattern[i]] = pattern.length - i - 1;
    }
    return chars;
  };

  const table = setTable(needle);
  let skip = 0;
  while (haystack.length - skip >= needle.length) {
    let i = needle.length - 1;
    while (haystack[skip + i] === needle[i]) {
      if (i === 0) return skip;
      i--;
    }
    skip += (table[haystack[skip + needle.length - 1]] || needle.length);
  }

  return -1;
}
