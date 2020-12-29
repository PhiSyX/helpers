import { assertEquals } from "https://deno.land/std@0.82.0/testing/asserts.ts";

import { fuzzysearch } from "./search.ts";

Deno.test(
  "[shared/search/fuzzysearch]: base",
  () => {
    const word = "PhiSyX";
    const filter = "s";
    const result = fuzzysearch(filter, word);
    assertEquals(result, [
      { type: "TEXT", word: "Phi" },
      { type: "HIT", word: "S" },
      { type: "TEXT", word: "yX" },
    ]);

    const word2 = "Pseudo[absente]";
    const filter2 = "s[e]";
    const result2 = fuzzysearch(filter2, word2);
    assertEquals(result2, [
      { type: "TEXT", word: "P" },
      { type: "HIT", word: "s" },
      { type: "TEXT", word: "eudo" },
      { type: "HIT", word: "[" },
      { type: "TEXT", word: "abs" },
      { type: "HIT", word: "e" },
      { type: "TEXT", word: "nte" },
      { type: "HIT", word: "]" },
    ]);

    const word3 = "Pseudo[absente]";
    const filter3 = "M";
    const result3 = fuzzysearch(filter3, word3);
    assertEquals(result3, []);
  },
);
