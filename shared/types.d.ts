/**
 * @author Mike 'PhiSyX' S.
 *
 * Les types globaux utiles
 */

/**
 * @example ```
 *   interface {
 *     prop: ARRAY<number>
 *     equivalent: number[]
 *   }
 * ```
 */
export type ARRAY<T = any> = T[];

/**
 * @example ```
 *   interface {
 *     prop: OBJECT<string>
 *     equivalent: { [property: string]: string }
 *   }
 * ```
 */
export type OBJECT<T = any> = { [property: string]: T };

/**
 * @example ```
 *   function name(complicatedCallback: FIXME): FIXME {};
 * ```
 */
export type FIXME = any;

/**
 * @example ```
 *   function POC(callback: TODO): TODO {};
 * ```
 */
export type TODO = any;

/**
 * @example ```
 *   const arr: ARRAY<WHATEVER> = [];
 * ```
 */
export type WHATEVER = any;

/**
 * @example ```
 *   interface {
 *     prop: Nullable<string>
 *     equivalent: string | null
 *   }
 * ```
 */
export type Nullable<T> = T | null;

/**
 * Utilisé pour les ID's.
 *
 * @param string ID -> souvent les uuid
 * @param number ID -> auto
 */
export type ID = string | number;
