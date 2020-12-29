/* @extends string */

import type { OBJECT } from "./types.d.ts";

import { _lwr, EMPTY_STRING, toString } from "./string.ts";

const ACCENTS_A = {
  "ä": "ae",
  "æ": "ae",
  "ǽ": "ae",
  "Ä": "Ae",
  "Æ": "AE",
  "Ǽ": "AE",
  "ö": "oe",
  "œ": "oe",
  "ü": "ue",
  "Ü": "Ue",
  "Ö": "Oe",
  "À": "A",
  "Á": "A",
  "Â": "A",
  "Ã": "A",
  "Å": "A",
  "Ǻ": "A",
  "Ā": "A",
  "Ă": "A",
  "Ą": "A",
  "Ǎ": "A",
  "à": "a",
  "á": "a",
  "â": "a",
  "ã": "a",
  "å": "a",
  "ǻ": "a",
  "ā": "a",
  "ă": "a",
  "ą": "a",
  "ǎ": "a",
  "ª": "a",
};

const ACCENTS_C = {
  "Ç": "C",
  "Ć": "C",
  "Ĉ": "C",
  "Ċ": "C",
  "Č": "C",
  "ç": "c",
  "ć": "c",
  "ĉ": "c",
  "ċ": "c",
  "č": "c",
};

const ACCENTS_D = {
  "Ð": "D",
  "Ď": "D",
  "Đ": "D",
  "ð": "d",
  "ď": "d",
  "đ": "d",
};

const ACCENTS_E = {
  "È": "E",
  "É": "E",
  "Ê": "E",
  "Ë": "E",
  "Ē": "E",
  "Ĕ": "E",
  "Ė": "E",
  "Ę": "E",
  "Ě": "E",
  "è": "e",
  "é": "e",
  "ê": "e",
  "ë": "e",
  "ē": "e",
  "ĕ": "e",
  "ė": "e",
  "ę": "e",
  "ě": "e",
};

const ACCENTS_F = {
  "ƒ": "f",
};

const ACCENTS_G = {
  "Ĝ": "G",
  "Ğ": "G",
  "Ġ": "G",
  "Ģ": "G",
  "Ґ": "G",
  "ĝ": "g",
  "ğ": "g",
  "ġ": "g",
  "ģ": "g",
  "ґ": "g",
};

const ACCENTS_H = {
  "Ĥ": "H",
  "Ħ": "H",
  "ĥ": "h",
  "ħ": "h",
};

const ACCENTS_I = {
  "І": "I",
  "Ì": "I",
  "Í": "I",
  "Î": "I",
  "Ї": "Yi",
  "Ï": "I",
  "Ĩ": "I",
  "Ī": "I",
  "Ĭ": "I",
  "Ǐ": "I",
  "Į": "I",
  "İ": "I",
  "і": "i",
  "ì": "i",
  "í": "i",
  "î": "i",
  "ï": "i",
  "ї": "yi",
  "ĩ": "i",
  "ī": "i",
  "ĭ": "i",
  "ǐ": "i",
  "į": "i",
  "ı": "i",
  "Ĳ": "IJ",
  "ĳ": "ij",
};

const ACCENTS_JK = {
  "Ĵ": "J",
  "ĵ": "j",

  "Ķ": "K",
  "ķ": "k",
};

const ACCENTS_L = {
  "Ĺ": "L",
  "Ļ": "L",
  "Ľ": "L",
  "Ŀ": "L",
  "Ł": "L",
  "ĺ": "l",
  "ļ": "l",
  "ľ": "l",
  "ŀ": "l",
  "ł": "l",
};

const ACCENTS_N = {
  "Ñ": "N",
  "Ń": "N",
  "Ņ": "N",
  "Ň": "N",
  "ñ": "n",
  "ń": "n",
  "ņ": "n",
  "ň": "n",
  "ŉ": "n",
};

const ACCENTS_O = {
  "Ò": "O",
  "Ó": "O",
  "Ô": "O",
  "Õ": "O",
  "Ō": "O",
  "Ŏ": "O",
  "Ǒ": "O",
  "Ő": "O",
  "Ơ": "O",
  "Ø": "O",
  "Ǿ": "O",
  "ò": "o",
  "ó": "o",
  "ô": "o",
  "õ": "o",
  "ō": "o",
  "ŏ": "o",
  "ǒ": "o",
  "ő": "o",
  "ơ": "o",
  "ø": "o",
  "ǿ": "o",
  "º": "o",
  "Œ": "OE",
};

const ACCENTS_R = {
  "Ŕ": "R",
  "Ŗ": "R",
  "Ř": "R",
  "ŕ": "r",
  "ŗ": "r",
  "ř": "r",
};

const ACCENTS_S = {
  "Ś": "S",
  "Ŝ": "S",
  "Ş": "S",
  "Ș": "S",
  "Š": "S",
  "ß": "ss",
  "ẞ": "SS",
  "ś": "s",
  "ŝ": "s",
  "ş": "s",
  "ș": "s",
  "š": "s",
  "ſ": "s",
};

const ACCENTS_T = {
  "Ţ": "T",
  "Ț": "T",
  "Ť": "T",
  "Ŧ": "T",
  "ţ": "t",
  "ț": "t",
  "ť": "t",
  "ŧ": "t",
  "Þ": "TH",
  "þ": "th",
};

const ACCENTS_U = {
  "Ù": "U",
  "Ú": "U",
  "Û": "U",
  "Ũ": "U",
  "Ū": "U",
  "Ŭ": "U",
  "Ů": "U",
  "Ű": "U",
  "Ų": "U",
  "Ư": "U",
  "Ǔ": "U",
  "Ǖ": "U",
  "Ǘ": "U",
  "Ǚ": "U",
  "Ǜ": "U",
  "ù": "u",
  "ú": "u",
  "û": "u",
  "ũ": "u",
  "ū": "u",
  "ŭ": "u",
  "ů": "u",
  "ű": "u",
  "ų": "u",
  "ư": "u",
  "ǔ": "u",
  "ǖ": "u",
  "ǘ": "u",
  "ǚ": "u",
  "ǜ": "u",
};

const ACCENTS_Y = {
  "Ý": "Y",
  "Ÿ": "Y",
  "Ŷ": "Y",
  "ý": "y",
  "ÿ": "y",
  "ŷ": "y",
  "Є": "Ye",
  "є": "ye",
};

const ACCENTS_W = {
  "Ŵ": "W",
  "ŵ": "w",
};

const ACCENTS_Z = {
  "Ź": "Z",
  "Ż": "Z",
  "Ž": "Z",
  "ź": "z",
  "ż": "z",
  "ž": "z",
};

const SPECIAL_CHARS = {
  "\|": "ou",
  "&": "et",
  "\.": " ",
  "°": " ",
  "・": " ",
  "–": " ",
  "\'": " ",
  "\’": " ",
  "\(": "",
  "\)": "",
  ",": "",
  ":": "",
  ";": "",
  "“": "",
  "”": "",
};

const ARTICLES_GRAMMATICAUX = [
  "des",
  "de",
  "du",

  "les",
  "le",
  "la",
  "l'",

  "une",
  "un",

  "aux",
  "au",
];

export function slugify($$1: string, separator = "-"): string {
  let content = toString($$1);

  const LIST_CHARS_TO_REPLACE: OBJECT<string> = {
    ...ACCENTS_A,
    ...ACCENTS_C,
    ...ACCENTS_D,
    ...ACCENTS_E,
    ...ACCENTS_F,
    ...ACCENTS_G,
    ...ACCENTS_H,
    ...ACCENTS_I,
    ...ACCENTS_JK,
    ...ACCENTS_L,
    ...ACCENTS_N,
    ...ACCENTS_O,
    ...ACCENTS_R,
    ...ACCENTS_S,
    ...ACCENTS_T,
    ...ACCENTS_U,
    ...ACCENTS_Y,
    ...ACCENTS_W,
    ...ACCENTS_Z,
    ...SPECIAL_CHARS,
  };

  const listCharsToReplace = Object.keys(LIST_CHARS_TO_REPLACE);
  const regexp1 = new RegExp(`[${listCharsToReplace}]`, "g");

  const articles = ARTICLES_GRAMMATICAUX.join("[^-]|");
  const regexp2 = new RegExp(`^(?:${articles})`, "gi");

  content = content.trim();

  content = content.replace(regexp1, (full: string) => {
    return LIST_CHARS_TO_REPLACE[full] ?? EMPTY_STRING;
  });

  content = content.trim();

  content = content.replace(regexp2, EMPTY_STRING);

  content = content.trim();

  content = content
    .replace(/\s/g, separator)
    .replace(new RegExp(`${separator}{2,}`, "g"), separator)
    .replace(new RegExp(`^${separator}|${separator}$`, "g"), "");

  return _lwr(content);
}
