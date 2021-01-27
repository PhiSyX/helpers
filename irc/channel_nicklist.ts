import { IrcNick, IrcNickInterface } from "./nick.ts";

import { _lwr, escapeRegExp } from "../shared/string.ts";
import { OBJECT } from "../shared/types.d.ts";
import { chunkArray } from "../shared/array.ts";

// !!!!!!!!! //
// ! TYPES ! //
// !!!!!!!!! //

// ?         ::   IRC Channel Nicklist

export interface IrcChannelNickInterface {
  /**
   * Les modes de salon d'un pseudo
   */
  modes: IrcChannelNicklistGradeSymbolType[];

  /**
   * Utilisateur
   */
  nick: IrcNickInterface;
}

export class IrcChannelNick implements IrcChannelNickInterface {
  modes: IrcChannelNicklistGradeSymbolType[] = [];
  nick!: IrcNickInterface;
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

export interface IrcUIChannelNickInterface {
  filter: boolean;
  state: IrcChannelNickInterface;
}

export class IrcUIChannelNick implements IrcUIChannelNickInterface {
  filter: boolean = false;

  state!: IrcChannelNickInterface;

  constructor(state: IrcChannelNickInterface) {
    this.setState(state);
  }

  setState(state: IrcChannelNickInterface): this {
    this.state = state;
    return this;
  }
}

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

export function orderNicklist(nicks: IrcChannelNickInterface[]) {
  function handleSort(
    ircChannelNick1: IrcChannelNickInterface,
    ircChannelNick2: IrcChannelNickInterface,
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

export function parseNick(
  fullAddress: string,
): IrcChannelNickInterface[][] {
  const re = /(?<NICK>[^!]*)!(?<IDENT>[^@]*)@(?<HOSTNAME>[^\s]*)/g;
  const matches = fullAddress.matchAll(re);

  let temp: IrcChannelNickInterface[] = [];

  for (const match of matches) {
    const groups = match.groups as {
      NICK: string;
      IDENT: string;
      HOSTNAME: string;
    };

    const chanNick = new IrcChannelNick();

    const nick = new IrcNick();
    nick.nick = groups.NICK;
    nick.ident = groups.IDENT;
    nick.hostname = groups.HOSTNAME;

    chanNick.modes = prefixNick(groups.NICK.trim());
    chanNick.nick = nick;

    temp = [...temp, chanNick];
  }

  return chunkArray(orderNicklist(temp), 250);
}

export function prefixNick(nick: string): IrcChannelNicklistGradeSymbolType[] {
  const re = [
    escapeRegExp(GradeSymbol.OWNER),
    escapeRegExp(GradeSymbol.PROTECTOR),
    escapeRegExp(GradeSymbol.OPERATOR),
    escapeRegExp(GradeSymbol.HALFOPER),
    escapeRegExp(GradeSymbol.VOICER),
  ].join("|");

  const matches = nick.matchAll(new RegExp(re, "g"));

  let prefixes: IrcChannelNicklistGradeSymbolType[] = [];
  for (const match of matches) {
    const [prefix] = match as IrcChannelNicklistGradeSymbolType[];
    prefixes = [...prefixes, prefix];
  }

  return prefixes;
}
