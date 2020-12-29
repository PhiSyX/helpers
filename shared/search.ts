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
    // ! FIXME
    last.word += word;
    return arr;
  }

  const payload = {
    type,
    word,
  };

  return [...arr, payload];
});

/**
 *  Simple fuzzy search.
 */
export function fuzzysearch(
  needle: string,
  haystack: string,
): FuzzySearchRecord[] {
  const searchLen = needle.length;
  const inStrLen = haystack.length;

  let patternIdx = 0;
  let strIdx = 0;

  let matches: FuzzySearchRecord[] = [];

  while (patternIdx !== searchLen && strIdx !== inStrLen) {
    const patternChar = needle.charAt(patternIdx);
    const strChar = haystack.charAt(strIdx);
    const push = pushToResult(matches)(strChar);
    if (
      patternChar === strChar ||
      patternChar.toLowerCase() === strChar.toLowerCase()
    ) {
      ++patternIdx;
      matches = push("HIT");
    } else {
      matches = push("TEXT");
    }
    ++strIdx;
  }

  matches = pushToResult(matches)(haystack.slice(strIdx))("TEXT");

  return searchLen !== 0 && inStrLen !== 0 && patternIdx === searchLen
    ? matches
    : [];
}

/**
 * @see https://fr.wikipedia.org/wiki/Algorithme_de_Boyer-Moore-Horspool
 */
export function searchByMoore(
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
