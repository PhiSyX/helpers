# Mes utilitaires pour JavaScript (écrit en TypeScript).

- [Documentation / API](#documentationapi)
- [Guide de style](#styleguide)

## Répertoires :
  - **shared/**: est un dossier contenant des sources "partagées", qui pourront tant bien être utilisées pour **node**, **deno** ou le **web** ;

    [Types](./shared/types.d.ts)
      - `ARRAY`<`T`>
      - `OBJECT`<`T`>
      - `FIXME`
      - `TODO`
      - `WHATEVER`
      - `Nullable`<`T`>
      - `ID`

    [array.ts](./shared/array.ts)
      - `firstEntry`
      - `lastEntry`
      - `randomEntry`

    [date.ts](./shared/date.ts) (fr)
      - `timestamp`

    [lang.ts](./shared/lang.ts)
      - `isUndefined`
      - `isNull`
      - `isNil`
      - `iswmcs`
      - `iswm`

    [reactivity.ts](./shared/reactivity.ts)
      - `reactivity`
      - `watcher`

    [search.ts](./shared/search.ts)
      - `fuzzySearch`
      - `mooreSearch`

    [string.ts](./shared/string.ts)
      - `_lwr`
      - `_upr`
      - `capitalize`
      - `escapeHtml`
      - `escapeRegExp`
      - `hash`
      - `nl2br`
      - `toString`
      - `userFriendlyNumber`
      - `uuid`

  - **deno/**: est dossier contenant des utilitaires pour **[deno](https://deno.land/)** uniquement ;

    [fs.ts](./deno/fs.ts)
      - `readFile`

        Le drapeau `--allow-read` est requis pour exécuter cette fonction.

    [terminal.ts](./deno/terminal.ts)
      - `clearConsole`
      - `getCommandArgs`

  - **node/**: est un dossier contenant des utilitaires pour **node** uniquement ;

    [env](./node/env.ts)
      - `__DEV__`
      - `__PROD__`
      - `__TEST__`
      - `env`

  - **web/**: est un dossier contenant des utilitaires pour le **web** uniquement ;

    [env](./web/env.ts)
      - `userAgent`
      - `isAndroid`
      - `isIOS`
      - `isMobile`




## Récupérer ce projet ?
  - Télécharger le projet depuis un terminal en utilisant [git](https://git-scm.com), ou en téléchargeant le zip.

    Ligne de commande:
    > $   git clone https://github.com/PhiSyX/helpers

## Utiliser ce code pour les autres projets ?
  - Requiert d'avoir un projet pouvant compiler le typescript. (ou Deno).

  - Créer un [lien symbolique](https://fr.wikipedia.org/wiki/Lien_symbolique).

    Comme ce sont des sources qui pourront être partagées entre plusieurs projets, il est préférable de créer un lien symbolique.

    Sous Windows:
    > $   MKLINK /D "**PROJECT_TARGET**" "**REPO_GIT_FOLDER**"
    > > **PROJECT_TARGET**  "/mon/super/projet/personnel/helpers" \
    > > **REPO_GIT_FOLDER** "/dossier/téléchargé/helpers"
    >

  - Importer les utilitaires spécifiques dans les différents projets et les utiliser.

## Tests unitaires :
  Pour lancer les tests unitaires, il requiert [deno](https://deno.land/) d'installé sur son OS.

  Les fichiers de tests se terminent tous par **_test.ts**.

---

Pour lancer tous les tests unitaires:
  > $   deno test \*\*/\*_test.ts --allow-read

---

Pour lancer les tests unitaires d'un dossier en particulier
  > $   deno test **$DIRECTORY** [flags] \
  > $   deno test **$DIRECTORY**/*_test.ts [flags]

---

Pour lancer les tests unitaires d'un test en particulier
  > $   deno test **$DIRECTORY**/**$FILENAME**_test.ts [flags]


---
---
---
---
---

# Documentation/API

Répertoire [shared/](./shared)
  - [Types](./shared/types.d.ts)
    - "`ARRAY`<`T`>" ce type est l'équivalent de "`T[]`"
    - "`OBJECT`<`T`>" ce type est l'équivalent de "`{ [p: string]: T }`"
    - "`FIXME`"
    - "`TODO`"
    - "`WHATEVER`" alias de "`any`"
    - "`Nullable`<`T`>" ce type est l'équivalent de "`T | null`"
    - "`ID`" ce type est l'équivalent de "`number | string`"

  - [array.ts](./shared/array.ts)
    - `firstEntry`<`ItemType`>(arr: `ItemType`): [`ItemType`, number] | [null,null];

      Retourne la première entrée d'un tableau, s'il y a des entrées, null sinon.

      > Exemple :
      > ```js
      > const [ value, index ] = firstEntry(["foo", 2 ,3 , 4 , 5, "bar"]);
      > console.log(value, index); // "foo", 0
      >
      > const [value2, index2] = firstEntry([]);
      > console.log(value2, index2); // null, null
      > ```

    - `lastEntry`<`ItemType`>(arr: `ItemType`): [`ItemType`, number] | [null,null];

      Retourne la dernière entrée d'un tableau, s'il y a des entrées, null sinon.

      > Exemple :
      > ```js
      > const [ value, index ] = lastEntry(["foo", 2 ,3 , 4 , 5, "bar"]);
      > console.log(value, index); // "bar", 5
      >
      > const [ value2, index2 ] = lastEntry([]);
      > console.log(value2, index2); // null, null
      > ```

    - `randomEntry`<`ItemType`>(arr: `ItemType`): [`ItemType`, number] | [null,null];

      Retourne une entrée aléatoire d'un tableau, s'il y a des entrées, null sinon.

      > Exemple :
      > ```js
      > const [ value, index ] = randomEntry([1 ,2, 3, 4, 5]);
      > console.log(value, index); // ?, ?
      > ```

  - [date.ts](./shared/date.ts) (fr)
    - `timestamp`({ `format` = "[H:i:s]", `time` = new Date() }): string;

      Cette fonction convertie une `Date` au format souhaité.

      > Exemple :
      > ```js
      > console.log(timestamp()); // 17:10:08
      > console.log(timestamp({ format: "H:i" })); // 17:10
      > ```

  - [lang.ts](./shared/lang.ts)
    - `isUndefined`($$1): boolean;

      Retourne `true` si une entrée est `undefined`, `false` sinon.

    - `isNull`($$1): boolean;

      Retourne `true` si une entrée est `null`, `false` sinon.

    - `isNil`($$1): boolean;

      Retourne `true` si une entrée est `null` et/ou `undefined`, `false` sinon.

    - `iswmcs`(needle: `string`, haystack: `string`**[**, exceptChars: `string[]`, flags: `string`**]**): boolean;

      Comparaison entre deux chaînes de caractères avec l'utilisation des jokers (sensible à casse)

      **wm** = wildcard match, **cs** = case sensitive

      > Exemple :
      > ```js
      > console.log(iswmcs("PhiSyX", "phis?x")); // false
      > console.log(iswmcs("PhiSyX[absent]", "PhiSyX[*]")); // true
      > console.log(iswmcs("Pseudo[occupee]", "Pseudo[??????]")); // false
      > console.log(iswmcs("Amérique", "Am[ée3]r??ue", ["[", "]"])); // true
      > ```

    - `iswm`(needle: `string`, haystack: `string`**[**, exceptChars: `string[]`, flags: `string` = "i"**]**): boolean;

      Alias de `iswmcs` (mais insensible à la casse)

  - [reactivity.ts](./shared/reactivity.ts)
    - `reactivity`<`ObjectType`>(raw: `ObjectType`): Proxy<`ObjectType`>;

      Rend votre objet réactif.

    - `watcher`(callback: `() => void`): void;

      A chaque changement de l'objet réactif, le callback est appelé.

      > Exemple :
      > ```js
      > const state = reactivity({
      >   foo: "bar",
      >   bar: "foo",
      > });
      >
      > watcher(() => {
      >   console.log("La propriété 'state.foo' est", state.foo);
      > })
      >
      > watcher(() => {
      >   console.log("La propriété 'state.var' est", state.bar);
      > })
      >
      > watcher(() => {
      >   const $el = document.querySelector("...");
      >   *patch($el, state); // ? exemple: met à jour les données d'un élément
      > });
      >
      > ...
      > ...
      > ...
      >
      > state.foo = "bla";
      > state.bar = "foobar";
      > ```
      >

  - [search.ts](./shared/search.ts)
    - `fuzzySearch`(needle: `string`, haystack: `string`): [FuzzySearchRecord](./shared/search.ts#L10)[]

      Recherche floue

      > Exemple :
      > ```js
      > const word = "PhiSyX";
      > const filter = "s";
      > const result = fuzzySearch(filter, word);
      > console.log(result); // [{ type: "TEXT", word: "Phi" }, { type: "HIT", word: "S" },{ type: "TEXT", word: "yX" }]
      > ```

    - `mooreSearch`(needle: `string`, haystack: `string`): number;

      Voir https://fr.wikipedia.org/wiki/Algorithme_de_Boyer-Moore-Horspool

  - [string.ts](./shared/string.ts)
    - `_lwr`($$1): string;

      Cette fonction est l'équivalent de `$$1.toLowerCase()`

    - `_upr`($$1): string;

      Cette fonction est l'équivalent de `$$1.toUpperCase()`

    - `capitalize`($$1): string;

      Remplace tous les premiers caractères de mots d'une phrase par une majuscule, et le reste en minuscule.

    - `escapeHtml`($$1): string;

      Échappe les caractères HTML en leurs entités.

      https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html#rule-1-html-encode-before-inserting-untrusted-data-into-html-element-content

    - `escapeRegExp`($$1): string;

      Échappe les caractères "spéciaux" `regex` d'une chaîne de caractère.
      Les caractères échappés sont : "`^$\.*+?()[]{}|`".

    - `hash`(): string;

      Génère une chaîne de caractère avec des caractères alphanumériques aléatoires de taille 8.

    - `nl2br`($$1): string; (php functions)

      Ajout de sauts de lignes HTML "<`br` />" à chaque nouvelle ligne "`\n`".

    - `toString`($$1): string;

      Transforme une entrée en chaîne de caractère.

      > Exemple :
      > ```js
      > toString(1); // "1"
      > toString({ foo: "bar" }); // '{"foo":"bar"}'
      > toString(function n(){ console.log("ok") }); // 'function n(){ console.log("ok") }'
      > toString(class { foo = "bar"; }); // 'class { constructor() { this.foo = "bar"; }; }'
      > ```

    - `userFriendlyNumber`(n: `number`): string;

      Rendre un nombre plus "user friendly".

      > Exemple :
      > ```js
      > console.log(userFriendlyNumber(103300)); // "103.3k"
      > ```

    - `uuid`(): string;

      Génère une chaîne de caractère avec des caractères alphanumériques aléatoires de taille 36.

Répertoire [deno/](./deno)
  - [fs](./deno/fs.ts)
    - **async** `readFile`(path: `string`**[**, encoding?: `string`**]**);

  - [terminal](./deno/terminal.ts)
    - `clearConsole`(...text: `ARRAY`<`string`>);
    - `getCommandArgs`();

Répertoire [node/](./node)
  - [env](./node/env.ts)
    - constante `__DEV__`: boolean;

      Retourne `true` si la variable d'environnement `NODE_ENV` est à "`development`", `false` sinon.

    - constante `__PROD__`: boolean;

      Retourne `true` si la variable d'environnement `NODE_ENV` est à "`production`", `false` sinon.

    - constante `__TEST__`: boolean;

      Retourne `true` si la variable d'environnement `NODE_ENV` est à "`test`", `false` sinon.
      Cette variable vérifie également s'il y a `Cypress` dans l'objet `Window`, si c'est le cas elle retourne `true`.

    - `env`(key: `string`, $default?: `string`): `Nullable`<`string`>;

      Récupération d'une variable d'environnement.

      Certaines variables d'environnements peuvent être définies dans les fichiers racines du projet:
        - .env (chargé dans tous les cas.)
        - .env.local (chargé dans tous les cas, mais ignoré par `git`.)
        - .env.[mode] (chargé uniquement dans un mode spécifique.)
        - .env.[mode].local (chargé uniquement dans un mode spécifique, mais ignoré par `git`)

      >  ```js
      >  env('NODE_ENV') // 'test'
      >  env('UNKNOWN_VARIABLE') // null
      >  env('UNKNOWN_VARIABLE', 'FOUND_VARIABLE') // 'a value' (si `FOUND_VARIABLE` est définie.)
      >  env('UNKNOWN_VARIABLE', 'NOT_FOUND_VARIABLE') // 'NOT_FOUND_VARIABLE' (si aucune des deux variables ne sont définies.)
      >  env('UNKNOWN_VARIABLE', 'Salut à toi') // 'Salut à toi' (si `UNKNOWN_VARIABLE` n'est pas existant.)
      > ```

Répertoire [web/](./web)
  - [env](./web/env.ts)
    - constante `userAgent`: boolean;

    - constante `isAndroid`: boolean;

    - constante `isIOS`: boolean;

    - constante `isMobile`: boolean;

# STYLEGUIDE
## Le JS pour ce projet :
  - N'utiliser que "`let`" ou "`const`" au lieu de "`var`".

  - Les **noms des constantes** avec des valeurs **statiques** doivent être en **MAJUSCULE**, *sinon* en *minuscule*.
    > Exemple:
    > ```js
    > const VARIABLE = "value"; // est ce que j'appelle une valeur statique.
    > const VARIABLE_2 = 1; // est ce que j'appelle une valeur statique.
    > const users = arr.map(() => ({ foo: "bar" })); // est ce que j'appelle une valeur qui n'est pas "statique".
    > ```

  - Les noms des variables doivent suivre cette nomenclature: `snake_case` ou `camelCase`.
    - normal:
      > ```js
      > const VARIABLE = "value";
      > let variable = 1;
      > ```

    - `snake_case`:
      > ```js
      > const variable_name = () => "foo";
      > let variable_ame    = () => "bar";
      > ```

    - `camelCase`:
      > ```js
      > const variableName = () => "foo";
      > let variableName   = () => "bar";
      > ```

  - Les noms des classes doivent suivre cette nomenclature: `PascalCase`.
    > ```js
    > class Entity {}
    > class UserEntity extends Entity {}
    > ```

## Le TS pour ce projet :
  - Ne pas utiliser le type "`any`". Mieux vaut utiliser plutôt "`WHATEVER`", "`FIXME`" ou "`TODO`".
