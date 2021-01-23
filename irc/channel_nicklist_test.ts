import {
  assertEquals,
  assertNotEquals,
} from "https://deno.land/std@0.84.0/testing/asserts.ts";

import {
  dirname,
  fromFileUrl,
  resolve,
} from "https://deno.land/std@0.84.0/path/mod.ts";

import { readFile } from "../deno/fs.ts";
import {
  IrcChannelNicklistInterface,
  orderNicklist,
} from "./channel_nicklist.ts";

const moduleDir = dirname(fromFileUrl(import.meta.url));
const testdataDir = resolve(moduleDir, "testdata");

Deno.test(
  "[irc/channel_nicklist/orderNicklist]: base",
  async () => {
    const fakeNicklist: IrcChannelNicklistInterface[] = await readFile(
      `${testdataDir}/nicklist.json`,
      "json",
    );

    const sorted = orderNicklist(fakeNicklist);
    assertEquals(sorted, [
      { modes: ["@", "~", "%", "+"], nick: { nick: "Chef de salon" } },
      { modes: ["@", "&", "~"], nick: { nick: "PhiSyX" } },
      { modes: ["&", "@"], nick: { nick: "Opérateur protégé" } },
      { modes: ["@", "+"], nick: { nick: "Opérateur" } },
      { modes: ["%", "+"], nick: { nick: "%Demi Opérateur" } },
      { modes: ["+"], nick: { nick: "Utilisateur important" } },
      { modes: [], nick: { nick: "Utilisateur lambda" } },
      { modes: [], nick: { nick: "Utilisateur[absent]" } },
      { modes: [], nick: { nick: "Utilisateur[occupee]" } },
    ]);
  },
);

Deno.test(
  "[irc/channel_nicklist/orderNicklist]: filtered",
  async () => {
    const fakeNicklist: IrcChannelNicklistInterface[] = await readFile(
      `${testdataDir}/nicklist_filtered.json`,
      "json",
    );

    const sorted = orderNicklist(fakeNicklist);
    assertEquals(sorted, [
      { filter: true, modes: ["@", "&", "~"], nick: { nick: "PhiSyX" } },
      { filter: true, modes: [], nick: { nick: "Utilisateur[absent]" } },
      { filter: true, modes: [], nick: { nick: "Utilisateur[occupee]" } },
      { modes: ["@", "~", "%", "+"], nick: { nick: "Chef de salon" } },
      { modes: ["&", "@"], nick: { nick: "Opérateur protégé" } },
      { modes: ["@", "+"], nick: { nick: "Opérateur" } },
      { modes: ["%", "+"], nick: { nick: "%Demi Opérateur" } },
      { modes: ["+"], nick: { nick: "Utilisateur important" } },
      { modes: [], nick: { nick: "Utilisateur lambda" } },
    ]);

    assertNotEquals(sorted, [
      { modes: ["@", "~", "%", "+"], nick: { nick: "Chef de salon" } },
      { modes: ["@", "&", "~"], nick: { nick: "PhiSyX" } },
      { modes: ["&", "@"], nick: { nick: "Opérateur protégé" } },
      { modes: ["@", "+"], nick: { nick: "Opérateur" } },
      { modes: ["%", "+"], nick: { nick: "%Demi Opérateur" } },
      { modes: ["+"], nick: { nick: "Utilisateur important" } },
      { modes: [], nick: { nick: "Utilisateur lambda" } },
      { modes: [], nick: { nick: "Utilisateur[absent]" } },
      { modes: [], nick: { nick: "Utilisateur[occupee]" } },
    ]);
  },
);
