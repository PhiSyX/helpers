import { assertEquals } from "https://deno.land/std@0.82.0/testing/asserts.ts";

import { capitalize, toString, userFriendlyNumber } from "./string.ts";

Deno.test(
  "[shared/string/toString]: base",
  () => {
    assertEquals(toString(1), "1");
    assertEquals(toString({ foo: "bar" }), '{"foo":"bar"}');
    assertEquals(toString("foobar"), "foobar");
    assertEquals(toString(null), "null");
    assertEquals(toString(undefined), "undefined");
  },
);

Deno.test(
  "[shared/string/toString]: function",
  () => {
    assertEquals(
      toString(function test() {
        console.log("ok");
      }),
      `function test() {\n        console.log("ok");\n    }`,
    );

    assertEquals(
      toString(
        class {
          foo = "bar";
        },
      ),
      'class {\n        constructor() {\n            this.foo = "bar";\n        }\n    }',
    );
  },
);

Deno.test(
  "[shared/string/capitalize]: base",
  () => {
    const expectedCapitalize = "Je Fais Un Test";

    const text = "je fais un test";
    assertEquals(capitalize(text), expectedCapitalize);

    const text2 = "JE FAIS UN TEST";
    assertEquals(capitalize(text2), expectedCapitalize);

    const text3 = "je fAiS Un TEST";
    assertEquals(capitalize(text3), expectedCapitalize);
  },
);

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
