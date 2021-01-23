import {
  assertEquals,
  assertThrowsAsync,
} from "https://deno.land/std@0.84.0/testing/asserts.ts";

import {
  dirname,
  fromFileUrl,
  resolve,
} from "https://deno.land/std@0.84.0/path/mod.ts";

import type { FileJSONInterface } from "./testdata/file.d.ts";

import { readFile } from "./fs.ts";

const moduleDir = dirname(fromFileUrl(import.meta.url));
const testdataDir = resolve(moduleDir, "testdata");

Deno.test(
  "[deno/fs/readFile]: fichier JSON retourne un object JSON (et non une string)",
  async () => {
    const json: Partial<FileJSONInterface> = await readFile(
      `${testdataDir}/file.json`,
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
        `${testdataDir}/files.json`,
        "json",
      )
    );
  },
);
