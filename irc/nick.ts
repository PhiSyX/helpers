import type { ID, Nullable } from "../shared/types.d.ts";

// !!!!!!!!! //
// ! TYPES ! //
// !!!!!!!!! //

// ?         ::   IRC - Nick

export type IrcNickClientType = "irc" | "html5";

export interface IrcNickInterface {
  /**
   * id unique
   */
  id: ID;

  /**
   * Chemin de l'avatar de l'utilisateur
   */
  avatar: Nullable<string>;

  /**
   * Est-ce que l'utilisateur est absent ?
   */
  away: Nullable<string>;

  /**
   * Ident de l'utilisateur
   */
  ident: string;

  /**
   * Hôte de l'utilisateur
   */
  host: string;

  /**
   * Est-ce qu'il s'agit de l'utilisateur lui-même ?
   */
  myself: boolean;

  /**
   * Pseudo de l'utilisateur
   */
  nick: string;

  /**
   * La valeur de cette propriété n'est visible que par les IRCops.
   * La valeur de cette propriété n'est pas définie si le client n'a pas les droits d'IRCop.
   */
  modes: string[];

  /**
   * Sur quel type de client l'utilisateur est connecté
   */
  type: IrcNickClientType;
}
