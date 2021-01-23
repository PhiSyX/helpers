import { assertEquals } from "../deno/test_mod.ts";

import {
  chunkArray,
  firstEntry,
  lastEntry,
  pluckCollect,
  randomEntry,
} from "./array.ts";

Deno.test(
  "[shared/array/chunkArray]: base",
  () => {
    const myArray = [1, 2, 3, 4, 5, 6, 7, 8];

    const chunked = chunkArray(myArray, 2);
    assertEquals(chunked.length, 4);

    const chunked2 = chunkArray(myArray, 250);
    assertEquals(chunked2.length, 1);
  },
);

Deno.test(
  "[shared/array/firstEntry]: comportement de base",
  () => {
    const myArray = [1, 2, 3, 4, 5, 6, 7, 8];

    const [value] = firstEntry(myArray);
    assertEquals(value, 1);

    const [value2, index2] = firstEntry(myArray);
    assertEquals(value2, 1);
    assertEquals(index2, 0);

    const [value3] = firstEntry([]);
    assertEquals(value3, null);
  },
);

Deno.test(
  "[shared/array/firstEntry]: la valeur est 0",
  () => {
    const myArray2 = [0, 2, 3, 4, 5, 6, 7, 9];

    const [value] = firstEntry(myArray2);
    assertEquals(value, 0);

    const [value2, index2] = firstEntry(myArray2);
    assertEquals(value2, 0);
    assertEquals(index2, 0);
  },
);

Deno.test(
  "[shared/array/lastEntry]: comportement de base",
  () => {
    const myArray = [1, 2, 3, 4, 5, 6, 7, 8];

    const [value] = lastEntry(myArray);
    assertEquals(value, 8);

    const [value2, index2] = lastEntry(myArray);
    assertEquals(value2, 8);
    assertEquals(index2, 7);

    const [value3] = lastEntry([]);
    assertEquals(value3, null);
  },
);

Deno.test(
  "[shared/array/lastEntry]: la valeur est 0",
  () => {
    const myArray3 = [1, 2, 3, 4, 5, 6, 7, 0];

    const [value] = lastEntry(myArray3);
    assertEquals(value, 0);

    const [value2, index2] = lastEntry(myArray3);
    assertEquals(value2, 0);
    assertEquals(index2, 7);
  },
);

Deno.test(
  "[shared/array/randomEntry]: vide",
  () => {
    assertEquals(randomEntry([]), [null, null]);
  },
);

Deno.test(
  "[shared/array/pluckCollect]: base",
  () => {
    const collection = [
      { nick: "Mike", mode: ["q"] },
      { nick: "PhiSyX", mode: ["h"] },
      { nick: "fakeNick", mode: ["v"] },
      { nickss: "fakeNick", mode: ["v"] },
    ];
    const result = pluckCollect<string>(collection, "nick");
    assertEquals(
      result,
      ["Mike", "PhiSyX", "fakeNick"],
    );

    const result2 = pluckCollect<string>(collection, "mode");
    assertEquals(
      result2,
      [["q"], ["h"], ["v"], ["v"]],
    );
  },
);
