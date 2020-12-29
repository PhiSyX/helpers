import { assertEquals } from "https://deno.land/std@0.82.0/testing/asserts.ts";

import { isNil, isNull, isUndefined } from "./lang.ts";

Deno.test(
  "[shared/lang/isNil]: base",
  () => {
    assertEquals(isNil(null), true);
    assertEquals(isNil(undefined), true);

    assertEquals(isNil("null"), false);
    assertEquals(isNil("undefined"), false);
  },
);

Deno.test(
  "[shared/lang/isNull]: base",
  () => {
    assertEquals(isNull(null), true);
    assertEquals(isNull("null"), false);
    assertEquals(isNull(undefined), false);
  },
);

Deno.test(
  "[shared/lang/isUndefined]: base",
  () => {
    assertEquals(isUndefined(undefined), true);
    assertEquals(isUndefined("undefined"), false);
    assertEquals(isUndefined(null), false);
  },
);
