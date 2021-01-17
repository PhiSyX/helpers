import {
  assertEquals,
  assertThrows,
} from "https://deno.land/std@0.82.0/testing/asserts.ts";

import type { IrcNickInterface } from "./nick.ts";

import { readFile } from "../deno/fs.ts";
import { $address } from "./helpers.ts";

const { cwd } = Deno;

const rootDir = cwd() + "/irc/testdata";

const mask1 = [
  "*!ec8d6781@gateway/web/dispatch/fake-ip.110.111.110.101",
  "*!*ec8d6781@gateway/web/dispatch/fake-ip.110.111.110.101",
  "*!*@gateway/web/dispatch/fake-ip.110.111.110.101",
  "*!*ec8d6781@*.110.111.110.101",
  "*!*@*.110.111.110.101",
  "A02Guxt1!ec8d6781@gateway/web/dispatch/fake-ip.110.111.110.101",
  "A02Guxt1!*ec8d6781@gateway/web/dispatch/fake-ip.110.111.110.101",
  "A02Guxt1!*@gateway/web/dispatch/fake-ip.110.111.110.101",
  "A02Guxt1!*ec8d6781@*.110.111.110.101",
  "A02Guxt1!*@*.110.111.110.101",
];

const mask2 = [
  "*!~fakenick@11-122-66-99.dyn.grandenetworks.net",
  "*!*fakenick@11-122-66-99.dyn.grandenetworks.net",
  "*!*@11-122-66-99.dyn.grandenetworks.net",
  "*!*fakenick@*.dyn.grandenetworks.net",
  "*!*@*.dyn.grandenetworks.net",
  "fakenick!~fakenick@11-122-66-99.dyn.grandenetworks.net",
  "fakenick!*fakenick@11-122-66-99.dyn.grandenetworks.net",
  "fakenick!*@11-122-66-99.dyn.grandenetworks.net",
  "fakenick!*fakenick@*.dyn.grandenetworks.net",
  "fakenick!*@*.dyn.grandenetworks.net",
];

Deno.test(
  "[irc/helpers/$address]: base",
  async () => {
    const nick1: IrcNickInterface = await readFile(
      `${rootDir}/nick_1.json`,
      "json",
    );
    const nick2: IrcNickInterface = await readFile(
      `${rootDir}/nick_2.json`,
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
    const nick1: IrcNickInterface = await readFile(
      `${rootDir}/nick_1.json`,
      "json",
    );

    assertThrows(() => $address(nick1, 12));
  },
);
