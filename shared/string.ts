import type { OBJECT, WHATEVER } from "./types.d.ts";

import { isNil } from "./lang.ts";

export const EMPTY_STRING = "";

export function toString($$1: WHATEVER): string {
  if (typeof $$1 !== "string") {
    try {
      let transform = JSON.stringify($$1);
      if (isNil(transform)) throw new EvalError();
      return transform;
    } catch { // ? $$1 = function() {}
      return String($$1);
    }
  }

  return $$1;
}

export function _lwr<Type$$1>($$1: Type$$1): string {
  const algo = (str: string) => str.toLowerCase();
  return algo(toString($$1));
}

export function _upr<Type$$1>($$1: Type$$1): string {
  const algo = (str: string) => str.toUpperCase();
  return algo(toString($$1));
}

export function capitalize<Type$$1>($$1: Type$$1): string {
  interface AlgoParams {
    lower: typeof _lwr;
    upper: typeof _upr;
  }

  const algo = ({ lower, upper }: AlgoParams) => {
    return (str: string) => upper(str[0]) + lower(str.slice(1));
  };

  const SEPARATOR = /([\s-_]+)/;

  return toString($$1)
    .split(SEPARATOR)
      .map(algo({ lower: _lwr, upper: _upr }))
    .join("")
  ;
}

/**
 * Retourne une chaîne de caractère avec les caractères échappés (entités HTML).
 *
 * @see https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html#rule-1-html-encode-before-inserting-untrusted-data-into-html-element-content
 */
export function escapeHtml($$1: string): string {
  const algo = (str: string) => {
    const CHARS_TO_ESCAPE: OBJECT<string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#x27;",
    };

    const charsKeys = Object.keys(CHARS_TO_ESCAPE).join("");
    const regexp = new RegExp(`([${charsKeys}])`, "ig");
    return str.replace(regexp, (_, $1) => CHARS_TO_ESCAPE[$1]);
  };

  return algo(toString($$1));
}

/**
 * Échappe les caractères spéciaux de types `RegExp` d'une chaîne de caractère.
 *
 * @SPECIAL_CHARS ^$\.*+?()[]{}|
 */
export function escapeRegExp($$1: string, exceptChars: string[] = []): string {
  const SPECIAL_CHARS = "^$.*+?()[]{}|";
  const ESCAPED_WITH = "\\";

  const escaped = escapeCharacters(SPECIAL_CHARS, ESCAPED_WITH, exceptChars);
  const charsToEscapeRE = new RegExp(`[${escaped}]`, "g");
  const checkCharsRE = new RegExp(charsToEscapeRE.source, "g");
  const str = toString($$1);

  return checkCharsRE.test(str)
    ? str.replace(charsToEscapeRE, ESCAPED_WITH + "$&")
    : str
  ;
}

/**
 * Échappe des caractères d'une chaîne de caractère
 */
export function escapeCharacters(
  specialChars: string,
  escapeWith: string,
  exceptChars: string[] = [],
): string {
  return specialChars
    .split("")
      .filter((w) => !exceptChars.includes(w))
      .map((w) => escapeWith + w)
    .join("")
  ;
}

/**
 * @php
 */
export function nl2br($$1: string): string {
  const algo = (str: string) =>
    str.replace(/\n/g, "<br />")
  ;
  return algo(toString($$1));
}

/**
 * Génère une chaîne de caractère aléatoire.
 */
function getRandomString(str: string): string {
  const { floor: f, random: r } = Math;

  let dt = new Date().getTime();
  const replaceXY = (c: string) => {
    const random = (dt + r() * 16) % 16 | 0;
    dt = f(dt / 16);
    return (c === "x" ? random : (random & 0x3 | 0x8)).toString(16);
  };

  return str
    .replace(/[xy]/g, replaceXY)
    .replace(/^\d/g, () => "x");
}

/**
 * Rendre un nombre plus "user friendly".
 */
export function userFriendlyNumber(n: number): string {
  const { abs: a, floor: f, log: l, min, pow: p, round: r } = Math;

  const round = (n: number, precision: number) => {
    const precis = p(10, precision);
    return r(n * precis) / precis;
  };

  const format = (n: number) => {
    // TODO: pourrait être un tableau de chaîne de caractère:
    //       [' m', ' Mo', ' Md']
    const abbrev = "kmb";

    let base = f(l(a(n)) / l(1000));
    let suffix = abbrev[min(2, base - 1)];

    base = abbrev.indexOf(suffix) + 1;

    return suffix ? round(n / p(1000, base), 2) + suffix : "" + n;
  };

  return format(n);
}

/**
 * Génère un UUID unique.
 */
export const uuid = (): string =>
  getRandomString("yxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx")
;

/**
 * Génère un hash unique.
 */
export const hash = (): string =>
  getRandomString("yxxxxxxy")
;
