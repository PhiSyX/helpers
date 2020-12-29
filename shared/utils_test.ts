import { assertEquals } from "https://deno.land/std@0.82.0/testing/asserts.ts";

import {
  higherOrderFunction,
  higherOrderFunctionReverse,
  higherOrderFunctionReverseArguments,
} from "./utils.ts";

/**
 * Fonctions d'exemples à rendre "pure"
 */

function log(str1: string, str2: string, str3: string) {
  return {
    str1,
    str2,
    str3,
  };
}

function inArray(str: string, arr: string[]) {
  return arr.includes(str);
}

Deno.test(
  "[shared/utils/higherOrderFunction]: base",
  () => {
    const testHOF = higherOrderFunction(log);

    const expectedResult = {
      str1: "a",
      str2: "b",
      str3: "c",
    };

    assertEquals(log("a", "b", "c"), expectedResult);
    assertEquals(testHOF("a", "b", "c"), expectedResult);
    assertEquals(testHOF("a")("b")("c"), expectedResult);
    assertEquals(testHOF("a", "b")("c"), expectedResult);

    const testHOF2 = higherOrderFunction(inArray);
    assertEquals(testHOF2("foo", ["bar", "foo"]), true);
    assertEquals(testHOF2("not-found", ["bar", "foo"]), false);
  },
);

Deno.test(
  "[shared/utils/higherOrderFunctionReverse]: base",
  () => {
    const testHOFRA = higherOrderFunctionReverse(log);

    assertEquals(testHOFRA("c", "b", "a"), {
      str1: "c",
      str2: "b",
      str3: "a",
    });

    assertEquals(testHOFRA("c")("b")("a"), {
      str1: "a",
      str2: "b",
      str3: "c",
    });

    assertEquals(testHOFRA("c", "b")("a"), {
      str1: "a",
      str2: "c",
      str3: "b",
    });

    const testHOFRA2 = higherOrderFunctionReverse(inArray);
    const myArrayHas = testHOFRA2(["bar", "foo"]);

    assertEquals(myArrayHas("foo"), true);
    assertEquals(myArrayHas("not-found"), false);
  },
);

Deno.test(
  "[shared/utils/higherOrderFunctionReverseArguments]: base",
  () => {
    const testHOFRA = higherOrderFunctionReverseArguments(log);

    const expectedResult = {
      str1: "a",
      str2: "b",
      str3: "c",
    };

    assertEquals(log("a", "b", "c"), expectedResult);
    assertEquals(testHOFRA("c", "b", "a"), expectedResult);
    assertEquals(testHOFRA("c")("b")("a"), expectedResult);
    assertEquals(testHOFRA("c", "b")("a"), expectedResult);

    const testHOFRA2 = higherOrderFunctionReverseArguments(inArray);
    const myArrayHas = testHOFRA2(["bar", "foo"]);

    assertEquals(myArrayHas("foo"), true);
    assertEquals(myArrayHas("not-found"), false);
  },
);
