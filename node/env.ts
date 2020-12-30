import type { Nullable } from "../shared/types.d.ts";

/**
 * L'application est-elle lancée sur un environnement de développement?
 */
export const __DEV__: boolean = env("NODE_ENV") === "development";

/**
 * L'application est-elle lancée sur un environnement de production?
 */
export const __PROD__: boolean = env("NODE_ENV") === "production";

/**
 * L'application est-elle lancée sur un environnement de test?
 *
 * @example `yarn serve --mode test`
 * @example `yarn test:unit`
 * @example `yarn test:e2e`
 */
export const __TEST__: boolean = env("NODE_ENV") === "test" || (
  typeof window !== "undefined" &&
  // @ts-ignore
  typeof window.Cypress !== "undefined"
);

/**
 * Récupération d'une variable d'environnement.
 *
 * Certaines variables d'environnements peuvent être définies dans les fichiers racines du projet:
 *   - .env                # Chargé dans tous les cas.
 *   - .env.local          # Chargé dans tous les cas, mais ignoré par `git`.
 *   - .env.[mode]         # Chargé uniquement dans un mode spécifique.
 *   - .env.[mode].local   # Chargé uniquement dans un mode spécifique, mais ignoré par `git`.
 *
 * @param {string} key Nom de la clé de la variable d'environnement à récupérer.
 * @param {*string} $default Valeur par défaut (au cas où).
 * @return {string|null} =>
 *  Valeur d'une variable d'environnement si elle existe sinon, une valeur par défaut.
 */
export function env(key: string, $default?: string): Nullable<string> {
  // @ts-ignore
  return process.env[key] || (
    // @ts-ignore
    $default ? process.env[$default] || $default : $default
  ) || $default || null;
}
