import type { FileJSONInterface } from "./testdata/file.d.ts";

import {
  assertEquals,
  assertThrowsAsync,
} from "https://deno.land/std@0.82.0/testing/asserts.ts";

import { readFile } from "./fs.ts";

const { cwd } = Deno;

const rootDir = cwd() + "/deno/testdata";

Deno.test(
  "[deno/fs/readFile]: fichier JSON retourne un object JSON (et non une string)",
  async () => {
    const json: Partial<FileJSONInterface> = await readFile(
      `${rootDir}/file.json`,
      "json",
    );

    assertEquals(json.foobar, "foobar");
    assertEquals(json.bar, 2);
  },
);

Deno.test(
  "[deno/fs/readFile]: fichier inexistant",
  async () => {
    assertThrowsAsync(async () =>
      await readFile(
        `${rootDir}/files.json`,
        "json",
      )
    );
  },
);
