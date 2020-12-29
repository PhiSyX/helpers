import { assertEquals } from "https://deno.land/std@0.82.0/testing/asserts.ts";

import { slugify } from "./slugify.ts";

Deno.test(
  "[shared/slugify/slugify]: base",
  () => {
    const slug = slugify(
      "Son outil de traduction est aussi rapide que celui des poids lourds du secteur.",
    );

    assertEquals(
      slug,
      "son-outil-de-traduction-est-aussi-rapide-que-celui-des-poids-lourds-du-secteur",
    );
  },
);

Deno.test(
  "[shared/slugify/slugify]: retrait des articles grammaticaux francais en debut de phrase",
  () => {
    const slug = slugify(
      "Les géants de la technologie Moogle, Gicrosoft et Bacebook appliquent les leçons de l'apprentissage automatique à la traduction, mais une petite entreprise appelée DeepL les a tous dépassés et mis la barre plus haut encore. Son outil de traduction est aussi rapide que celui des poids lourds du secteur, mais plus précis et nuancé que tous ceux que nous avons essayés.",
    );

    assertEquals(
      slug,
      "geants-de-la-technologie-moogle-gicrosoft-et-bacebook-appliquent-les-lecons-de-l-apprentissage-automatique-a-la-traduction-mais-une-petite-entreprise-appelee-deepl-les-a-tous-depasses-et-mis-la-barre-plus-haut-encore-son-outil-de-traduction-est-aussi-rapide-que-celui-des-poids-lourds-du-secteur-mais-plus-precis-et-nuance-que-tous-ceux-que-nous-avons-essayes",
    );

    const slug1 = slugify("Là-haut.");
    assertEquals(slug1, "la-haut");

    const slug2 = slugify("La haut");
    assertEquals(slug2, "haut");
  },
);
