import type { Nullable } from "../shared/types.d.ts";

import { lastEntry } from "../shared/array.ts";
import { toString } from "../shared/string.ts";

export interface TextBlock {
  foreground: Nullable<number>;
  background: Nullable<number>;
  bold: boolean;
  italic: boolean;
  underline: boolean;
  reverse: boolean;
  text: string;
}

export enum FormatIrc {
  BOLD = "\x02",
  COLOR = "\x03",
  CTCP = "\x01",
  ITALIC = "\x1D",
  REVERSE = "\x16",
  RESET = "\x0F",
  UNDERLINE = "\x1F",
}

export interface Sentence {
  raw: string;
  formatted: TextBlock[];
}

export function format(str: string): Sentence {
  const formats = [
    FormatIrc.BOLD,
    FormatIrc.CTCP,
    FormatIrc.COLOR,
    FormatIrc.ITALIC,
    FormatIrc.REVERSE,
    FormatIrc.RESET,
    FormatIrc.UNDERLINE,
  ].join("");

  const formatsRE = new RegExp(
    `(${FormatIrc.COLOR + "\\d+(?:,\\d+)?"}|[${formats}])`,
    "g",
  );

  const splittedStr = toString(str).split(formatsRE).filter(Boolean);
  const blocks: TextBlock[] = splittedStr.reduce(setFormat, []);

  return {
    raw: str,
    formatted: blocks,
  };
}

function setFormat(acc: any, part: string): TextBlock[] {
  let [lastAcc] = lastEntry(acc);
  if (!lastAcc) {
    lastAcc = {};
  }

  switch (part) {
    case FormatIrc.BOLD:
      let boldState = lastAcc.bold === undefined ? true : !lastAcc.bold;
      return [
        ...acc,
        defaultValue({ ...lastAcc, bold: boldState, text: null as any }),
      ];

    case FormatIrc.COLOR:
      return [
        ...acc,
        defaultValue(
          { ...lastAcc, foreground: 0, background: 0, text: null as any },
        ),
      ];

    case FormatIrc.CTCP:
      return acc;

    case FormatIrc.ITALIC:
      let italicState = lastAcc.italic === undefined ? true : !lastAcc.italic;
      return [
        ...acc,
        defaultValue({ ...lastAcc, italic: italicState, text: null as any }),
      ];

    case FormatIrc.RESET:
      return [...acc, defaultValue({ text: null as any })];

    case FormatIrc.REVERSE:
      let reverseState = lastAcc.reverse === undefined
        ? true
        : !lastAcc.reverse;
      return [
        ...acc,
        defaultValue({ ...lastAcc, reverse: reverseState, text: null as any }),
      ];

    case FormatIrc.UNDERLINE:
      let underlineState = lastAcc.underline === undefined
        ? true
        : !lastAcc.underline;
      return [
        ...acc,
        defaultValue(
          { ...lastAcc, underline: underlineState, text: null as any },
        ),
      ];

    default:
      const colorRE = new RegExp(FormatIrc.COLOR + "(\\d+)(?:,(\\d+))?");
      const matches = part.match(colorRE);
      if (!matches) {
        break;
      }

      const [occ, strFG, strBG] = matches;
      if (!occ) {
        break;
      }

      const fg = parseInt(strFG, 10);
      const bg = parseInt(strBG, 10);

      return [
        ...acc,
        defaultValue({
          ...lastAcc,
          foreground: !isNaN(fg) ? fg : 0,
          background: !isNaN(bg) ? bg : 0,
          text: null as any,
        }),
      ];
  }

  if (lastAcc.text === null) {
    return [...acc.slice(0, -1), { ...lastAcc, text: part }];
  }

  return [...acc, defaultValue({ text: part })];
}

function defaultValue(merge: Partial<TextBlock>): TextBlock {
  return {
    foreground: 0,
    background: 0,
    bold: false,
    italic: false,
    reverse: false,
    underline: false,
    ...merge,
  } as TextBlock;
}
