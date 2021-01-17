# Mes utilitaires pour JavaScript (écrit en TypeScript).

  - [Documentation / API](#documentationapi)
  - [Guide de style](#styleguide)

## Répertoires :
  - **shared/**: est un dossier contenant des sources "partagées", qui pourront tant bien être utilisées pour **node**, **deno** ou le **web** ;

    [Types](./shared/types.d.ts)
      - `ARRAY`<`T`>
      - `FIXME`
      - `ID`
      - `Nullable`<`T`>
      - `OBJECT`<`T`>
      - `TODO`
      - `WHATEVER`

    [array.ts](./shared/array.ts)
      - `chunkArray`
      - `firstEntry`
      - `lastEntry`
      - `pluckCollect`
      - `randomEntry`

    [date.ts](./shared/date.ts) (fr)
      - `timestamp`

    [lang.ts](./shared/lang.ts)
      - `containsURL`
      - `iseq`
      - `isin`
      - `isincs`
      - `isNil`
      - `isNull`
      - `isPrimitive`
      - `isUndefined`
      - `iswm`
      - `iswmcs`

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
      - `slugify`*
      - `stripHtml`
      - `templateHtml`
      - `toString`
      - `userFriendlyNumber`
      - `uuid`

    [utils.ts](./shared/utils.ts)
      - `wait`
      - `higherOrderFunction`
      - `higherOrderFunctionReverse`
      - `higherOrderFunctionReverseArguments`

  - **deno/**: est dossier contenant des utilitaires pour **[deno](https://deno.land/)** uniquement ;

    [fs.ts](./deno/fs.ts)
      - `readFile`

        Le drapeau `--allow-read` est requis pour exécuter cette fonction.

    [terminal.ts](./deno/terminal.ts)
      - `clearConsole`
      - `getCommandArgs`

  - **node/**: est un dossier contenant des utilitaires pour **node** uniquement ;

    [env](./node/env.ts)
      - constante `__DEV__`
      - constante `__PROD__`
      - constante `__TEST__`
      - `env`

  - **web/**: est un dossier contenant des utilitaires pour le **web** uniquement ;

    [dom](./web/dom.ts)
      - constante `$html`
      - constante `$body`

    [env](./web/env.ts)
      - constante `userAgent`
      - constante `isAndroid`
      - constante `isIOS`
      - constante `isMobile`
      - constante `isHttps`

    [form](./web/form.ts)
      - `formData`



## Récupérer ce projet ?
  - Projet existant **sans** git d'initialisé ?

    Télécharger le projet depuis un terminal en utilisant [git](https://git-scm.com), ou en téléchargeant le zip.

    Ligne de commande:
    > $   git clone https://github.com/PhiSyX/helpers

    Créer un [lien symbolique](https://fr.wikipedia.org/wiki/Lien_symbolique) vers votre projet.

  - Projet existant **avec** git d'initialisé ?

    > $   git submodule add https://github.com/PhiSyX/helpers" **PROJECT_TARGET**
    > > **PROJECT_TARGET**  "/mon/super/projet/personnel/helpers"



## Utiliser ce code pour les autres projets ?
  - Requiert d'avoir un projet pouvant compiler le typescript.

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



## Tests End to End :
  Pour lancer les tests E2E, il requiert [node](https://nodejs.org/fr/) d'installé sur son OS. \
  J'utilise [Cypress](https://www.cypress.io) pour les tests E2E de ce projet.

  Les fichiers de tests E2E se terminent tous par **_e2e.ts**.

  - Installation des dépendances de tests E2E
    > $   cd web/ \
    > $   **npm** install

  - Avant de lancer les tests E2E, il faut lancer un serveur de test:
    > $   **npm** run test:server

  - Lancer les tests E2E :
    > $   **npm** run test:e2e

  **npm** : peut être remplacé par des alternatives (**yarn**,...?)



---
---
---
---
---

# Documentation/API

Cette documentation peut contenir des coquilles, ou peut ne pas être complète (par manque de temps, ou oublie).

Répertoire [shared/](./shared)
  - [Types](./shared/types.d.ts)
    - "`ARRAY`<`T`>" ce type est l'équivalent de "`T[]`"
    - "`FIXME`"
    - "`ID`" ce type est l'équivalent de "`number | string`"
    - "`Nullable`<`T`>" ce type est l'équivalent de "`T | null`"
    - "`OBJECT`<`T`>" ce type est l'équivalent de "`{ [p: string]: T }`"
    - "`TODO`"
    - "`WHATEVER`" alias de "`any`"

  - [array.ts](./shared/array.ts)
    - `chunkArray`<`ItemType`>(arr: `ItemType[]`, size: `number`): `Array`<`ItemType[]`>`

      Retourne un tableau de tableaux contenant des entrées de taille X (`size`)

      > Exemple :
      > ```js
      > const arr = chunkArray(
      >   [1, 2, 3, 4, 5, 6, 7, 8],
      >   2
      > );
      > console.log(arr); // [ [ 1, 2 ], [ 3, 4 ], [ 5, 6 ], [ 7, 8 ] ]
      > const arr2 = chunkArray(
      >   [1, 2, 3, 4, 5, 6, 7, 8],
      >   250
      > );
      > console.log(arr2); // [ [1, 2, 3, 4, 5, 6, 7, 8] ]
      > ```

    - `firstEntry`<`ItemType`>(arr: `ItemType[]`): [`ItemType`, number] | [null,null];

      Retourne la première entrée d'un tableau, s'il y a des entrées, null sinon.

      > Exemple :
      > ```js
      > const [ value, index ] = firstEntry(["foo", 2 ,3 , 4 , 5, "bar"]);
      > console.log(value, index); // "foo", 0
      >
      > const [value2, index2] = firstEntry([]);
      > console.log(value2, index2); // null, null
      > ```

    - `lastEntry`<`ItemType`>(arr: `ItemType[]`): [`ItemType`, number] | [null,null];

      Retourne la dernière entrée d'un tableau, s'il y a des entrées, null sinon.

      > Exemple :
      > ```js
      > const [ value, index ] = lastEntry(["foo", 2 ,3 , 4 , 5, "bar"]);
      > console.log(value, index); // "bar", 5
      >
      > const [ value2, index2 ] = lastEntry([]);
      > console.log(value2, index2); // null, null
      > ```

    - `pluckCollect`<`ReturnType`>(arr: `object`[], propName: `string`): `ReturnType[]`;

      Extrait les valeurs d'une collection en fonction d'un nom de propriété.

      > Exemple :
      > ```js
      > const collection = [
      >   { nick: "Mike", mode: ["q"] },
      >   { nick: "PhiSyX", mode: ["h"] },
      >   { nick: "fakeNick", mode: ["v"] },
      >   { nickss: "fakeNick", mode: ["v"] }, // erreur de propriété volontaire
      > ];
      >
      > const result = pluckCollect<string>(collection, "nick");
      > console.log(result);  // ["Mike", "PhiSyX", "fakeNick"]
      >
      > const result2 = pluckCollect<string>(collection, "mode");
      > console.log(result2); // [["q"], ["h"], ["v"], ["v"]],
      > ```

    - `randomEntry`<`ItemType`>(arr: `ItemType[]`): [`ItemType`, number] | [null,null];

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
    - `containsURL`($$1): boolean;

      Retourne `true` si une entrée contient une URL, `false` sinon.

    - `iseq`($$1, $$2): boolean;

      est l'équivalent de `return ($$1 === $$2)`.

      Peut être utile dans un cas de `higherOrderFunction`, ce pour quoi elle a été crée.

      > Exemple :
      > ```js
      > const v1 = "foo";
      > const v2 = Bar;
      > const isString = higherOrderFunction(iseq)("string");
      > console.log(isString(typeof v1), isString(typeof v2)
      > ```

    - `isin`($$1, $$2): boolean

      Alias de `isincs` (mais insensible à la casse)

    - `isincs`($$1, $$2): boolean;

      est l'équivalent de `$$2.indexOf($$1) >= 0`

    - `isNil`($$1): boolean;

      Retourne `true` si une entrée est `null` et/ou `undefined`, `false` sinon.

    - `isNull`($$1): boolean;

      Retourne `true` si une entrée est `null`, `false` sinon.

    - `iswm`(needle: `string`, haystack: `string`**[**, exceptChars: `string[]`, flags: `string` = "i"**]**): boolean;

      Alias de `iswmcs` (mais insensible à la casse)

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

    - `isPrimitive`($$1): boolean

      Retourne `true` si une entrée est une valeur primitive (`boolean`, `number` ou `string`), `false` sinon.

    - `isUndefined`($$1): boolean;

      Retourne `true` si une entrée est `undefined`, `false` sinon.

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

    - `slugify`($$1 **[**, separator: `string` = "-" **]**): string;

      Transforme une entrée en [slug](https://fr.wikipedia.org/wiki/Slug) web.

    - `stripHtml`($$1): string;

      Retire tous les tags HTML d'une entrée.

    - `templateHtml`($$1 **[**, payload: `object` = {}, escapeHtmlFn: ($$1) => string **]**): string;

      > Exemple :
      > ```js
      > const data = { text: "un texte", html: "<h1>un titre</h1>" };
      > const html = templateHtml(`<p>{{ text }}</p><div>{{{ html }}}</div>`, data);
      > console.log(html); // `<p>un texte</p><div><h1>un titre</h1></div>`
      > ```

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

  - [utils.ts](./shared/utils.ts)
    - `wait`(ms: `number`): void;

      Bloque l'event loop pendant une certaine durée passé en argument, durée en milliseconde. 1 seconde = 1000, 2 secondes = 2000, ... ;

    - `higherOrderFunction`(func **[**, arity: `Nullable<number>` = null **]**): `ReturnType`<`func`>;

      Transforme une simple fonction en fonction d'ordre supérieur.

      > Exemple:
      > ```js
      > const myLogFunction = (a, b, c) => console.log({ a, b, c });
      > const testLog = higherOrderFunction(myLogFunction);
      > testLog("a", "b", "c");
      > testLog("a")("b")("c");
      > testLog("a", "b")("c");
      > ```

    - `higherOrderFunctionReverse`(func **[**, arity: `Nullable<number>` = null **]**): `ReturnType`<`func`>;

      Alias de `higherOrderFunction` en inversant les arguments.

      > Exemple:
      > ```js
      > const myLogFunction = (a, b, c) => console.log({ a, b, c });
      > const testLog = higherOrderFunctionReverse(myLogFunction);
      > testLog("c", "b", "a");
      > testLog("c")("b")("a");
      > testLog("b", "c")("a");
      > ```

    - `higherOrderFunctionReverseArguments`(func **[**, arity: `Nullable<number>` = null **]**): `ReturnType`<`func`>;

      Alias de `higherOrderFunctionReverse` en inversant les arguments des arguments.

      > Exemple:
      > ```js
      > const myLogFunction = (a, b, c) => console.log({ a, b, c });
      > const testLog = higherOrderFunctionReverseArguments(myLogFunction);
      > testLog("c", "b", "a");
      > testLog("c")("b")("a");
      > testLog("c", "b")("a");
      > ```

Répertoire [deno/](./deno)
  - [fs](./deno/fs.ts)
    - **async** `readFile`(path: `string`**[**, encoding?: `string`**]**);

  - [terminal](./deno/terminal.ts)
    - `clearConsole`(...text: `ARRAY`<`string`>);

      > ```js
      > clearConsole(":-)");
      > ```

    - `getCommandArgs`();

      Retourne les arguments de la console
      > ```bash
      > $ deno run script.ts --foo=bar -f=b foo2 bar2
      > ```

      > ```js
      > console.log(getCommandArgs()); // { foo: "bar", "-f": "b", foo2: true, bar2: true }
      > ```


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
  - [dom](./web/dom.ts)
      - constante `$html`: HTMLHtmlElement;
      - constante `$body`: HTMLBodyElement;

  - [env](./web/env.ts)
    - constante `userAgent`: boolean;
    - constante `isAndroid`: boolean;
    - constante `isIOS`: boolean;
    - constante `isMobile`: boolean;
    - constante `isHttps`: boolean;

  - [form](./web/form.ts)
    - `formData`($form: `string` | `HTMLFormElement`): `FormData`;

      > Exemple :
      > ```js
      > const data = formData("#my-form");
      > for (const [key, value] of data) {
      >   console.log(key, value);
      > }
      > ```

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
