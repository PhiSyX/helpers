import type { ARRAY, OBJECT } from "../shared/types.d.ts";

export type CommandArgInterface = OBJECT<string | boolean>;

const { args, isatty, stdin: { rid } } = Deno;

/**
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
