import type { IrcNickInterface } from "./nick.ts";

import { _lwr } from "../shared/string.ts";
import { OBJECT } from "../shared/types.d.ts";

// !!!!!!!!! //
// ! TYPES ! //
// !!!!!!!!! //

// ?         ::   IRC Channel Nicklist

export interface IrcChannelNicklistInterface {
  /**
   * Les modes de salon d'un pseudo
   */
  modes: IrcChannelNicklistGradeSymbolType[];

  /**
   * Utilisateur
   */
  nick: IrcNickInterface;
}

export type IrcChannelNicklistGradeSymbolType =
  | "~"
  | "&"
  | "@"
  | "%"
  | "+";

export enum GradeSymbol {
  OWNER = "~",
  PROTECTOR = "&",
  OPERATOR = "@",
  HALFOPER = "%",
  VOICER = "+",
  USER = "",
}

// ?         ::   IRC - UI Nick Grade

export type IrcUIChannelNicklistGradeSymbolType =
  | IrcChannelNicklistGradeSymbolType
  | "";

export type IrcUINickGradeLetterType =
  | "q"
  | "a"
  | "o"
  | "h"
  | "v"
  | "";

export enum GradeLetter {
  OWNER = "q",
  PROTECTOR = "a",
  OPERATOR = "o",
  HALFOPER = "h",
  VOICER = "v",
  USER = "",
}

export type IrcUIChannelNicklistGradeCSSClassType =
  | "is-owner"
  | "is-protector"
  | "is-operator"
  | "is-halfoper"
  | "is-voicer"
  | "is-irc";

export enum GradeCSS {
  OWNER = "is-owner",
  PROTECTOR = "is-protector",
  OPERATOR = "is-operator",
  HALFOPER = "is-halfoper",
  VOICER = "is-voicer",
  USER = "is-irc",
}

export type IrcUIChannelNicklistGradePositionType =
  | 1 //   filter
  | 2 //   owner
  | 3 //   protector
  | 4 //   operator
  | 5 //   halfoper
  | 6 //   voicer
  | 99; // user

export enum GradePosition {
  FILTER = 1,
  OWNER = 2,
  PROTECTOR = 3,
  OPERATOR = 4,
  HALFOPER = 5,
  VOICER = 6,
  USER = 99,
}

export function orderNicklist(nicks: IrcChannelNicklistInterface[]) {
  function handleSort(
    ircChannelNick1: IrcChannelNicklistInterface,
    ircChannelNick2: IrcChannelNicklistInterface,
  ) {
    // @ts-expect-error
    const { filter: filter1, modes: modes1, nick: nick1 } = ircChannelNick1;
    // @ts-expect-error
    const { filter: filter2, modes: modes2, nick: nick2 } = ircChannelNick2;

    let { position: position1 } = highestMode(modes1);
    let { position: position2 } = highestMode(modes2);

    if (filter1) {
      position1 = GradePosition.FILTER;
    }
    if (filter2) {
      position2 = GradePosition.FILTER;
    }

    const res = position2 - position1;

    if (res === 0) {
      return compareByNick(nick1, nick2);
    }

    return position1 - position2;
  }

  return [...nicks].sort(handleSort);
}

const symbolsPositions: OBJECT<IrcUIChannelNicklistGradePositionType> = {
  "~": 2,
  "&": 3,
  "@": 4,
  "%": 5,
  "+": 6,
};

const symbolsLetters: OBJECT<IrcUINickGradeLetterType> = {
  "~": "q",
  "&": "a",
  "@": "o",
  "%": "h",
  "+": "v",
};

const positionsSymbols: OBJECT<IrcUIChannelNicklistGradeSymbolType> = {
  2: "~",
  3: "&",
  4: "@",
  5: "%",
  6: "+",
  99: "",
};

const symbolsClasses: OBJECT<IrcUIChannelNicklistGradeCSSClassType> = {
  "~": "is-owner",
  "&": "is-protector",
  "@": "is-operator",
  "%": "is-halfoper",
  "+": "is-voicer",
  "": "is-irc",
};

export function highestMode(
  modes: IrcChannelNicklistGradeSymbolType[],
): {
  cssClass: IrcUIChannelNicklistGradeCSSClassType;
  letter: IrcUINickGradeLetterType;
  position: IrcUIChannelNicklistGradePositionType;
  symbol: IrcUIChannelNicklistGradeSymbolType;
} {
  if (modes.length === 0) {
    return {
      cssClass: GradeCSS.USER,
      letter: GradeLetter.USER,
      position: GradePosition.USER,
      symbol: GradeSymbol.USER,
    };
  }

  const position = modes.reduce((acc, symbol) => {
    if (symbolsPositions[symbol] <= acc) {
      return symbolsPositions[symbol];
    }
    return acc;
  }, GradePosition.USER);
  const symbol = positionsSymbols[position];
  const letter = symbolsLetters[symbol];
  const cssClass = symbolsClasses[symbol];

  return { letter, symbol, cssClass, position };
}

function compareByNick(
  ircNick1: IrcNickInterface,
  ircNick2: IrcNickInterface,
) {
  const { nick: nick1 } = ircNick1;
  const { nick: nick2 } = ircNick2;
  return _lwr(nick1) < _lwr(nick2) ? -1 : 1;
}
