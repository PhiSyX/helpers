import type { ARRAY, OBJECT } from "../shared/types.d.ts";

export type CommandArgInterface = OBJECT<string | boolean>;

const { args, isatty, stdin: { rid } } = Deno;

/**
 * @example `script.ts` -> ```js
 *   clearConsole(":-)");
 * ```
 *
 * @example ```shell
 *   $ deno run script.ts
 *   @return {object} :-)
 * ```
 *
 * @param {string[]} text
 */
export function clearConsole(...text: ARRAY<string>) {
  if (isatty(rid)) {
    console.clear();
    console.log();
  }

  if (text.length) {
    text.forEach((t) => console.log(t));
    console.log();
  }
}

/**
 * @example `script.ts` -> ```js
 *   console.log(getCommandArgs());
 * ```
 *
 * @example ```shell
 *   $ deno run script.ts --foo=bar -f=b foo2 bar2
 *   @return {object} { foo: "bar", "-f": "b", foo2: true, bar2: true }
 * ```
 */
export function getCommandArgs(): CommandArgInterface {
  const mapper = (arg: string): CommandArgInterface => {
    const parts = arg.split("=");
    const [key, value = true] = parts;
    return { [key.replace(/^[-]{2}/, "")]: value };
  };

  const reducer = (acc: CommandArgInterface, item: CommandArgInterface) => ({
    ...acc,
    ...item,
  });

  return args.map(mapper).reduce(reducer, {});
}
