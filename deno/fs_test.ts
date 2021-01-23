import { assertEquals, assertThrowsAsync, testdataDir } from "./test_mod.ts";

import type { FileJSONInterface } from "./testdata/file.d.ts";

import { readFile } from "./fs.ts";

Deno.test(
  "[deno/fs/readFile]: fichier JSON retourne un object JSON (et non une string)",
  async () => {
    const json: Partial<FileJSONInterface> = await readFile(
      `${testdataDir(import.meta.url)}/file.json`,
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
        `${testdataDir(import.meta.url)}/files.json`,
        "json",
      )
    );
  },
);
