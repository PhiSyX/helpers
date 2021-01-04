import {
  assertEquals,
  assertMatch,
  assertNotMatch,
  assertThrows,
} from "https://deno.land/std@0.82.0/testing/asserts.ts";

import {
  capitalize,
  stripHtml,
  templateHtml,
  toString,
  userFriendlyNumber,
} from "./string.ts";

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

Deno.test(
  "[shared/string/stripHtml]: base",
  () => {
    assertMatch(
      `<h3>Selection du texte</h3>
    <div class="playground@bg:primary">
      <p class="u-select:none">.u-select:none</p>
      <p class="u-select:text">.u-select:text</p>
      <p class="u-select:all">.u-select:all</p>
      <p class="u-select:none">Ce texte ne peut pas etre selectionné.</p>
      <p class="u-select:text">
        Ce texte est
        <span class="u-select:none">partiellement</span> selectionnable
      </p>
      <p class="u-select:all">
        Ce texte est
        <span class="u-select:none">partiellement</span> selectionnable au
        clique.
      </p>
    </div>`,
      /(<([^>]+)>)/g,
    );

    assertNotMatch(
      stripHtml(`<h3>Selection du texte</h3>
    <div class="playground@bg:primary">
      <p class="u-select:none">.u-select:none</p>
      <p class="u-select:text">.u-select:text</p>
      <p class="u-select:all">.u-select:all</p>
      <p class="u-select:none">Ce texte ne peut pas etre selectionné.</p>
      <p class="u-select:text">
        Ce texte est
        <span class="u-select:none">partiellement</span> selectionnable
      </p>
      <p class="u-select:all">
        Ce texte est
        <span class="u-select:none">partiellement</span> selectionnable au
        clique.
      </p>
    </div>`),
      /(<([^>]+)>)/g,
    );
  },
);

Deno.test(
  "[shared/string/templateHtml]: base",
  () => {
    // Simple texte
    const simpleHtml = templateHtml(
      `<strong> text </strong>`,
    );
    assertEquals(simpleHtml, `<strong> text </strong>`);

    // HTML
    const html = templateHtml(
      `<strong>{{ remaining }}</strong> {{ remaining }} left`,
      { remaining: 20 },
    );
    assertEquals(html, `<strong>20</strong> 20 left`);

    // Propriété manquante
    assertThrows(() =>
      templateHtml(
        `<strong>{{ remaining }}</strong> {{ remaining }} left`,
        {
          lol: "foo",
        },
      )
    );
  },
);

Deno.test(
  "[shared/string/templateHtml]: escape html",
  () => {
    // Double interpolation {{ }}
    const html = templateHtml(
      `<strong>{{ remaining }}</strong> {{ remaining }} left`,
      { remaining: "<h2>20</h2>" },
    );

    assertEquals(
      html,
      `<strong>&lt;h2&gt;20&lt;/h2&gt;</strong> &lt;h2&gt;20&lt;/h2&gt; left`,
    );

    // Triple interpolation {{{ }}}
    const html2 = templateHtml(
      `<strong>{{{ remaining }}}</strong> {{{ remaining }}} left`,
      { remaining: "<h2>20</h2>" },
    );

    assertEquals(
      html2,
      `<strong><h2>20</h2></strong> <h2>20</h2> left`,
    );

    // les deux {{ }} et {{{ }}}
    const html3 = templateHtml(
      `<strong>{{{ remaining }}}</strong> {{ remaining }} left`,
      { remaining: "<h2>20</h2>" },
    );

    assertEquals(
      html3,
      `<strong><h2>20</h2></strong> &lt;h2&gt;20&lt;/h2&gt; left`,
    );
  },
);
