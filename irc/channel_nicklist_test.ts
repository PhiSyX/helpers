import { assertEquals, testdataDir } from "../deno/test_mod.ts";

import { readFile } from "../deno/fs.ts";
import {
  IrcChannelNickInterface,
  IrcUIChannelNick,
  orderNicklist,
  parseNick,
} from "./channel_nicklist.ts";

import { fuzzySearch } from "../shared/search.ts";

Deno.test(
  "[irc/channel_nicklist/orderNicklist]: base",
  async () => {
    const [fake, expect] = await readFile(
      `${testdataDir(import.meta.url)}/nicklist_sorted.json`,
      "json",
    );

    const fakeNicklist = fake
      .map((n: string) => parseNick(n + "!*@*")[0][0])
      .map((cn: IrcChannelNickInterface) => new IrcUIChannelNick(cn));

    const expectNicklist = expect
      .map((n: string) => parseNick(n + "!*@*")[0][0])
      .map((cn: IrcChannelNickInterface) => new IrcUIChannelNick(cn));

    assertEquals(orderNicklist(fakeNicklist), expectNicklist);
  },
);

Deno.test(
  "[irc/channel_nicklist/orderNicklist]: filtered",
  async () => {
    const [filterBy, fake, expect] = await readFile(
      `${testdataDir(import.meta.url)}/nicklist_filtered.json`,
      "json",
    );

    const fakeNicklist = fake
      .map((n: string) => parseNick(n + "!*@*")[0][0])
      .map((cn: IrcChannelNickInterface) => {
        const ui = new IrcUIChannelNick(cn);
        ui.filter = fuzzySearch(filterBy, cn.nick.nick).length !== 0;
        return ui;
      });

    const expectNicklist = expect
      .map((n: string) => parseNick(n + "!*@*")[0][0])
      .map((cn: IrcChannelNickInterface) => {
        const ui = new IrcUIChannelNick(cn);
        ui.filter = fuzzySearch(filterBy, cn.nick.nick).length !== 0;
        return ui;
      });

    assertEquals(orderNicklist(fakeNicklist), expectNicklist);
  },
);
