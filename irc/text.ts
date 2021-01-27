import type { ID, Nullable, WHATEVER } from "../shared/types.d.ts";
import type { IrcNickInterface } from "./nick.ts";

import { lastEntry } from "../shared/array.ts";
import { _lwr, _upr, hash, toString } from "../shared/string.ts";

import { parseNick } from "./channel_nicklist.ts";
import { IrcNick } from "./nick.ts";

import numeric from "./numeric.ts";

export interface TextBlock {
  id: ID;
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
  const blocks: TextBlock[] = splittedStr
    .reduce(setFormat, [])
    .filter((t) => t.text);

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
    id: hash(),
    foreground: 0,
    background: 0,
    bold: false,
    italic: false,
    reverse: false,
    underline: false,
    ...merge,
  } as TextBlock;
}

const regexp =
  /^(?:@([^\s]+)\s)?(?::((?:(?:([^\s!@]+)(?:!([^\s@]+))?)@)?(\S+))\s)?((?:[a-zA-Z]+)|(?:[0-9]{3}))(?:\s([^:].*?))?(?:\s:(.*))?$/i;

export interface ParseLineResultInterface {
  args: WHATEVER[];
  id: ID;
  type: string;
  message: Sentence;
  nick: IrcNickInterface;
  prefix: string;
  raw: string;
  reason: Sentence;
  receivedAt: Date;
  target: string;
  topic: Sentence;
  victim: string;
}

export function parse(str: string): ParseLineResultInterface {
  let temp: Partial<ParseLineResultInterface> = {};

  temp.raw = str;

  const matches = str.matchAll(new RegExp(regexp, "gi"));

  for (const match of matches) {
    const ircNick = new IrcNick();

    const _tags = match[1];
    _tags && _tags.split(";").forEach((tag) => {
      let parts = tag.split("=");
      let key = _lwr(parts[0]);
      let value = parts[1];
      switch (key) {
        case "unrealircd.org/userhost":
          ircNick.userhost = value;
          break;
        case "unrealircd.org/userip":
          ircNick.userip = value;
          break;
        case "msgid":
          temp.id = value;
          break;
        case "time":
          temp.receivedAt = new Date(value);
          break;
      }
    });

    if (!_tags) {
      temp.id = hash();
      temp.receivedAt = new Date();
    }

    if (match[3] && match[4] && match[5]) {
      ircNick.nick = match[3];
      ircNick.ident = match[4];
      ircNick.hostname = match[5];
      temp.nick = ircNick;
    }

    temp.prefix = match[2];
    temp.type = numeric[match[6]] || match[6];

    function basicArgs($match: string[]) {
      let args = $match[7] ? $match[7].split(/\s+/) : [];
      if ($match[8]) {
        args = [...args, match[8]];
      }
      return args;
    }

    function targetArgs($match: string[]) {
      let [target, ...args] = $match[7] ? $match[7].split(/\s+/) : [];
      if ($match[8]) {
        args = [...args, match[8]];
      }

      return { target, args: args.filter(Boolean) };
    }

    switch (temp.type) {
      case "CAP":
        temp.args = basicArgs(match);
        break;

      case "JOIN":
        const { target: joinTarget, args: joinArgs } = targetArgs(match);
        temp.target = joinTarget;
        temp.nick!.realname = format(joinArgs[1]);
        break;

      case "KICK":
        const { target: kickTarget, args: kickArgs } = targetArgs(match);
        const [kickVictim, kickReason] = kickArgs;
        temp.target = kickTarget;
        temp.victim = kickVictim;
        temp.reason = format(kickReason);
        break;

      case "INVITE":
      case "MODE":
        const { target: modeTarget, args: modeArgs } = targetArgs(match);
        temp.target = modeTarget;
        temp.args = modeArgs;
        break;

      case "PART":
        const { target: partTarget, args: partArgs } = targetArgs(match);
        temp.target = partTarget;
        temp.reason = format(partArgs[0] || "");
        break;

      case "NOTICE":
      case "PRIVMSG":
        temp.target = match[7];
        temp.message = format(match[8]);
        break;

      case "TOPIC":
        temp.target = match[7];
        temp.topic = format(match[8]);
        break;

      case "RPL_NAMREPLY":
        const [, , nameReplyTarget] = match[7].split(/\s+/);
        temp.target = nameReplyTarget;
        temp.args = parseNick(match[8]);
        break;

      default:
        temp.args = match[7] ? match[7].split(/\s+/) : [];
        if (match[8]) {
          if (!(temp.type.startsWith("RPL_") || temp.type.startsWith("ERR_"))) {
            temp.args = [...temp.args, format(match[8])];
          } else {
            temp.args = [...temp.args, match[8]];
          }
        }

        break;
    }
  }

  return temp as ParseLineResultInterface;
}
