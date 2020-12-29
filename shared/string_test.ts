import { assertEquals } from "https://deno.land/std@0.82.0/testing/asserts.ts";

import { userFriendlyNumber } from "./string.ts";

Deno.test(
  "[shared/string/userFriendlyNumber]: base",
  () => {
    assertEquals(userFriendlyNumber(1), "1");

    assertEquals(userFriendlyNumber(10), "10");

    assertEquals(userFriendlyNumber(100), "100");

    assertEquals(userFriendlyNumber(1000), "1k");
    assertEquals(userFriendlyNumber(3500), "3.5k");

    assertEquals(userFriendlyNumber(20000), "20k");
    assertEquals(userFriendlyNumber(40300), "40.3k");

    assertEquals(userFriendlyNumber(900000), "900k");
    assertEquals(userFriendlyNumber(103300), "103.3k");

    assertEquals(userFriendlyNumber(9000000), "9m");
  },
);
