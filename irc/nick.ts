import type { ID, Nullable } from "../shared/types.d.ts";
import type { Sentence, TextBlock } from "./text.ts";

import { uuid } from "../shared/string.ts";
import { format } from "./text.ts";

// !!!!!!!!! //
// ! TYPES ! //
// !!!!!!!!! //

// ?         ::   IRC - Nick

export type IrcNickClientType = "irc" | "html5";

export interface IrcNickAddress {
  /**
   * Ident de l'utilisateur
   */
  ident: string;

  /**
   * Hôte de l'utilisateur
   */
  hostname: string;

  /**
   * Pseudo de l'utilisateur
   */
  nick: string;
}

export interface IrcNickInterface extends IrcNickAddress {
  /**
   * Est-ce que l'utilisateur est absent ?
   */
  away: Nullable<string>;

  /**
   * La valeur de cette propriété n'est visible que par les IRCops.
   * La valeur de cette propriété n'est pas définie si le client n'a pas les droits d'IRCop.
   */
  userip: Nullable<string>;

  /**
   * La valeur de cette propriété n'est visible que par les IRCops.
   * La valeur de cette propriété n'est pas définie si le client n'a pas les droits d'IRCop.
   */
  userhost: Nullable<string>;

  /**
   * La valeur de cette propriété n'est visible que par les IRCops.
   * La valeur de cette propriété n'est pas définie si le client n'a pas les droits d'IRCop.
   */
  modes: string[];

  /**
   * Le vrai nom du pseudo
   */
  realname: Sentence;
}

export class IrcNick implements IrcNickInterface {
  away: Nullable<string> = null;
  modes: string[] = [];
  userhost: Nullable<string> = null;
  userip: Nullable<string> = null;

  ident!: string;
  hostname!: string;
  nick!: string;
  realname!: Sentence;
}

// ?         ::   IRC - UI Nick

export interface IrcUINickInterface {
  /**
   * id unique
   */
  id: ID;

  /**
   * Chemin de l'avatar de l'utilisateur
   */
  avatar: Nullable<string>;

  /**
   * Est-ce qu'il s'agit de l'utilisateur lui-même ?
   */
  myself: boolean;

  /**
   * Sur quel type de client l'utilisateur est connecté
   */
  type: IrcNickClientType;

  state: IrcNickInterface;

  setNick(nick: string): this;
  setIdent(ident: string): this;
  setHostname(hostname: string): this;
  setRealname(realname: string): this;
}

export class IrcUINick implements IrcUINickInterface {
  id: ID = uuid();
  avatar: Nullable<string> = null;
  myself: boolean = false;
  type: IrcNickClientType = "irc";

  state: IrcNickInterface = new IrcNick();

  setNick(nick: string): this {
    this.state.nick = nick;
    return this;
  }

  setIdent(ident: string): this {
    this.state.ident = ident;
    return this;
  }

  setHostname(hostname: string): this {
    this.state.hostname = hostname;
    return this;
  }

  setRealname(realname: string): this {
    this.state.realname = format(realname);
    return this;
  }
}
