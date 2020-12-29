import type { Nullable, WHATEVER } from "./types.d.ts";

/**
 * Transforme une simple fonction en fonction d'ordre supérieur.
 */
export function higherOrderFunction(
  func: Function,
  arity: Nullable<number> = null,
) {
  return function curried(...args: WHATEVER): WHATEVER {
    if (args.length >= (arity || func.length)) {
      // @ts-expect-error
      return func.apply(this, args);
    }
    // @ts-expect-error
    return curried.bind(this, ...args);
  };
}

/**
 * Transforme une simple fonction en fonction d'ordre supérieur avec les arguments inversés.
 */
export function higherOrderFunctionReverse(
  func: Function,
  arity: Nullable<number> = null,
) {
  return function curried(...args: WHATEVER[]) {
    if (args.length >= (arity || func.length)) {
      // @ts-expect-error
      return func.apply(this, [...args]);
    }

    return function curried2(...args2: WHATEVER[]) {
      // @ts-expect-error
      return curried.apply(this, [...args2, ...args]);
    };
  };
}

/**
 * Transforme une simple fonction en fonction d'ordre supérieur avec les arguments inversés.
 */
export function higherOrderFunctionReverseArguments(
  func: Function,
  arity: Nullable<number> = null,
) {
  return function curried(...args: WHATEVER[]) {
    if (args.length >= (arity || func.length)) {
      // @ts-expect-error
      return func.apply(this, [...args].reverse());
    }

    return function curried2(...args2: WHATEVER[]) {
      // @ts-expect-error
      return curried.apply(this, [...args2, ...args.reverse()].reverse());
    };
  };
}
