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

export type IrcUIChannelNicklistGradeCSSClassType =
  | "is-owner"
  | "is-protector"
  | "is-operator"
  | "is-halfoper"
  | "is-voicer"
  | "is-irc";

export type IrcUIChannelNicklistGradePositionType =
  | 1 //   filter
  | 2 //   owner
  | 3 //   protector
  | 4 //   operator
  | 5 //   halfoper
  | 6 //   voicer
  | 99; // user

enum GradePosition {
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

    let [, position1] = highestMode(modes1);
    let [, position2] = highestMode(modes2);

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

const positionsSymbols: OBJECT<IrcUIChannelNicklistGradeSymbolType> = {
  2: "~",
  3: "&",
  4: "@",
  5: "%",
  6: "+",
};

export function highestMode(
  modes: IrcChannelNicklistGradeSymbolType[],
): [
  IrcUIChannelNicklistGradeSymbolType,
  IrcUIChannelNicklistGradePositionType,
] {
  if (modes.length === 0) {
    return ["", GradePosition.USER];
  }

  const position = modes.reduce((acc, symbol) => {
    if (symbolsPositions[symbol] <= acc) {
      return symbolsPositions[symbol];
    }
    return acc;
  }, GradePosition.USER);
  const symbol = positionsSymbols[position];

  return [symbol, position];
}

function compareByNick(
  ircNick1: IrcNickInterface,
  ircNick2: IrcNickInterface,
) {
  const { nick: nick1 } = ircNick1;
  const { nick: nick2 } = ircNick2;
  return _lwr(nick1) < _lwr(nick2) ? -1 : 1;
}
