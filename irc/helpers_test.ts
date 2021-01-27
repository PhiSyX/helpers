import { assertEquals, assertThrows, testdataDir } from "../deno/test_mod.ts";

import { readFile } from "../deno/fs.ts";
import { $address } from "./helpers.ts";

Deno.test(
  "[irc/helpers/$address]: base",
  async () => {
    const [nick1, mask1] = await readFile(
      `${testdataDir(import.meta.url)}/nick_1.json`,
      "json",
    );
    const [nick2, mask2] = await readFile(
      `${testdataDir(import.meta.url)}/nick_2.json`,
      "json",
    );

    for (let index = 0; index <= 9; index++) {
      const result = $address(nick1, index);

      assertEquals(
        result,
        mask1[index],
      );
    }

    for (let index = 0; index <= 9; index++) {
      const result = $address(nick2, index);

      assertEquals(
        result,
        mask2[index],
      );
    }
  },
);

Deno.test(
  "[irc/helpers/$address]: type inexistant",
  async () => {
    const [nick1] = await readFile(
      `${testdataDir(import.meta.url)}/nick_1.json`,
      "json",
    );

    assertThrows(() => $address(nick1, 12));
  },
);
