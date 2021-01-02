import { assertEquals } from "https://deno.land/std@0.82.0/testing/asserts.ts";

import {
  containsURL,
  isin,
  isincs,
  isNil,
  isNull,
  isUndefined,
} from "./lang.ts";

import { iswm, iswmcs } from "./lang.ts";
import { higherOrderFunction } from "./utils.ts";

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

Deno.test(
  "[shared/lang/isincs]: base",
  () => {
    assertEquals(isincs("fais", "je fais un test"), true);
    assertEquals(isincs("faiS", "je fais un test"), false);
  },
);

Deno.test(
  "[shared/lang/isin]: base",
  () => {
    assertEquals(isin(1233, 1995), false);
    assertEquals(isin(9, 1995), true);
    assertEquals(isin("fais", "je fais un test"), true);
    assertEquals(isin("faire", "je fais un test"), false);
  },
);

Deno.test(
  "[shared/lang/iswmcs]: simple comparaison",
  () => {
    const simpleComparaison = higherOrderFunction(iswmcs, 2)(
      "PhiSyX",
    );
    assertEquals(simpleComparaison("PhiSyX"), true);
    assertEquals(simpleComparaison("Jules"), false);
  },
);

Deno.test(
  "[shared/lang/iswmcs]: sensible a la casse",
  () => {
    const csComparaison = higherOrderFunction(iswmcs, 2)(
      "PhiSyX",
    );
    assertEquals(csComparaison("PhiSyX"), true);
    assertEquals(csComparaison("phisyx"), false);
  },
);

Deno.test(
  "[shared/lang/iswm]: insensible a la casse",
  () => {
    const icsComparaison = higherOrderFunction(iswm, 2)(
      "PhiSyX",
    );
    assertEquals(icsComparaison("PhiSyX"), true);
    assertEquals(icsComparaison("phisyx"), true);
  },
);

Deno.test(
  "[shared/lang/iswmcs]: comparaison joker",
  () => {
    assertEquals(iswmcs("PhiSyX", "PhiS?X"), true);
    assertEquals(iswmcs("PhiSyX", "phis?x"), false);

    assertEquals(iswmcs("PhiSyX[absent]", "PhiSyX[*]"), true);
    assertEquals(iswmcs("PhiSyX[absent]", "PhiSyX[??????]"), true);

    assertEquals(iswmcs("Pseudo[occupee]", "Pseudo[??????]"), false);
    assertEquals(iswmcs("Pseudo[occupee]", "Pseudo[???*???]"), true);
  },
);

Deno.test(
  "[shared/lang/iswmcs]: comparaison exclusion regex",
  () => {
    assertEquals(
      iswmcs("PhiSyX|24ITmXX", "PhiSyX|????[mf]??"),
      false,
    );
    assertEquals(
      iswmcs("PhiSyX|24ITmXX", "PhiSyX|????[mf]??", ["[", "]"]),
      true,
    );
  },
);

Deno.test(
  "[shared/lang/containsURL]: base",
  () => {
    assertEquals(
      containsURL("je fais un test, visitez https://d"),
      false,
    );
    assertEquals(
      containsURL("Mon repo git https://github.com/PhiSyX/helpers blablabla"),
      true,
    );
  },
);
