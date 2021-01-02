import type { WHATEVER } from "./types.d.ts";

import { _lwr, escapeRegExp, toString } from "./string.ts";

export const isUndefined = ($$1: WHATEVER): boolean => $$1 === undefined;
export const isNull = ($$1: WHATEVER): boolean => $$1 === null;
export const isNil = ($$1: WHATEVER): boolean => $$1 == null;
export const isPrimitive = ($$1: WHATEVER): boolean => (
  typeof $$1 === "string" ||
  typeof $$1 === "number" ||
  typeof $$1 === "boolean"
);
export const iseq = ($$1: WHATEVER, $$2: WHATEVER) => $$1 === $$2;

export function isincs ($$1: WHATEVER, $$2: WHATEVER): boolean {
  const algo = (searchString: string, str: string) =>
    str.indexOf(searchString) >= 0
  ;

  return algo(toString($$1), toString($$2));
};

export function isin ($$1: WHATEVER, $$2: WHATEVER): boolean {
  return isincs(_lwr($$1), _lwr($$2));
}

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
    .replace(/\\\*/g, ".*")
  ;

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
