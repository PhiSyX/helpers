import type { WHATEVER } from "./types.d.ts";

import { escapeRegExp } from "./string.ts";

export const isUndefined = ($$1: WHATEVER): boolean => $$1 === undefined;
export const isNull = ($$1: WHATEVER): boolean => $$1 === null;
export const isNil = ($$1: WHATEVER): boolean => $$1 == null;

export function iswmcs(
  needle: string,
  haystack: string,
  exceptChars?: string[],
  flags?: string,
): boolean {
  if (!exceptChars) {
    exceptChars = [];
  }

  if (!flags) {
    flags = "";
  }

  const buildRegexp = escapeRegExp(haystack, exceptChars)
    .replace(/\\\?/g, ".")
    .replace(/\\\*/g, ".*");
  const regexp = new RegExp(buildRegexp, flags);
  return regexp.test(needle);
}

export function iswm(
  needle: string,
  haystack: string,
  exceptChars?: string[],
  flags?: string,
): boolean {
  if (!exceptChars) {
    exceptChars = [];
  }

  if (!flags) {
    flags = "";
  }

  flags += "i";

  return iswmcs(needle, haystack, exceptChars, flags);
}
