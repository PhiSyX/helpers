import type { OBJECT } from "./types.d.ts";

type DateKeyFormat = OBJECT<() => string | number>;

const LONG_DAYS_LANG_FR = [
  "Dimanche",
  "Lundi",
  "Mardi",
  "Mercredi",
  "Jeudi",
  "Vendredi",
  "Samedi",
];

const SHORT_DAYS_LANG_FR = [
  "Dim",
  "Lun",
  "Mar",
  "Mer",
  "Jeu",
  "Ven",
  "Sam",
];

const LONG_MONTHS_LANG_FR = [
  "Janvier",
  "Février",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Août",
  "Septembre",
  "Octobre",
  "Novembre",
  "Décembre",
];
const SHORT_MONTHS_LANG_FR = [
  "Jan",
  "Fév",
  "Mar",
  "Avr",
  "Mai",
  "Juin",
  "Juil",
  "Aoû",
  "Sep",
  "Oct",
  "Nov",
  "Déc",
];

/**
 * JOUR
 *
 * Représente les formats suivant:
 *
 *  `d` -> Jour du mois, sur deux chiffres (avec un zéro initial).
 *  `D` -> Jour de la semaine, en trois lettres.
 *  `j` -> Jour du mois sans les zéros initiaux.
 *  `l` ('L' minuscule) -> Jour de la semaine, textuel, version longue.
 *  `N` -> Représentation numérique ISO-8601 du jour de la semaine.
 *  `S` -> Suffixe ordinal d'un nombre pour le jour du mois, en anglais, sur deux lettres.
 *         Fonctionne bien avec `j`.
 *  `w` -> Jour de la semaine au format numérique.
 *  `z` -> Jour de l'année.
 *
 * @return {DateKeyFormat}
 */
function dayFormats(this: Date): DateKeyFormat {
  const date = this.getDate();
  const day = this.getDay();
  const year = this.getFullYear();

  return {
    /**
     * '01' à '31'
     */
    d: (): string => (date < 10 ? "0" : "") + date,
    /**
     * 'Dim' à 'Sam'
     */
    D: (): string => SHORT_DAYS_LANG_FR[day],
    /**
     * 1 à 31
     */
    j: (): number => date,
    /**
     * 'Dimanche' à 'Samedi'
     */
    l: (): string => LONG_DAYS_LANG_FR[day],
    /**
     * 1 (pour Lundi) à 7 (pour Dimanche)
     */
    N: (): number => (day === 0 ? 7 : day),
    /**
     * "st", "nd", "rd" ou "th"
     */
    S: (): string => {
      const dm10 = date % 10;
      const one = dm10 === 1 && date !== 11;
      const two = dm10 === 2 && date !== 12;
      const three = dm10 === 3 && date !== 13;
      return (one ? "st" : (two ? "nd" : (three ? "rd" : "th")));
    },
    /**
     * 0 (pour dimanche) à 6 (pour samedi)
     */
    w: (): number => day,
    /**
     * 0 à 365
     */
    z: (): number =>
      Math.ceil((Date.now() - (+new Date(year, 0, 1))) / 86400000),
  };
}

/**
 * SEMAINE
 *
 * Représente les formats suivant:
 *  `W` -> Numéro de semaine dans l'année ISO-8601, les semaines commencent le lundi.
 *         @exemple 42 (la 42ème semaine de l'année)
 *
 * @return {DateKeyFormat}
 */

function weekFormats(this: Date): DateKeyFormat {
  const day = this.getDay();
  return {
    W: (): string | number => {
      const dayNr = (day + 6) % 7;

      const target = new Date(this.valueOf());
      target.setDate(target.getDate() - dayNr + 3);
      const firstThursday = target.valueOf();
      target.setMonth(0, 1);
      if (target.getDay() !== 4) {
        target.setMonth(0, 1 + ((4 - target.getDay()) + 7) % 7);
      }
      const value = 1 + Math.ceil((firstThursday - (+target)) / 604800000);
      return (value < 10 ? "0" + value : value);
    },
  };
}

/**
 * MOIS
 *
 * Représente les formats suivants:
 *   `F` -> Mois, textuel, version longue, comme Janvier ou Décembre.
 *   `m` -> Mois au format numérique, avec zéros initiaux.
 *   `M` -> Mois, en trois lettres, en anglais.
 *   `n` -> Mois sans les zéros initiaux.
 *   `t` -> Nombre de jours dans le mois.
 *
 * @return {DateKeyFormat}
 */
function monthFormats(this: Date): DateKeyFormat {
  let year = this.getFullYear();
  const month = this.getMonth();

  return {
    /**
     * 'Janvier' à 'Décembre'
     */
    F: (): string => LONG_MONTHS_LANG_FR[month],
    /**
     * 01 à 12
     */
    m: (): number => Number((month < 9 ? "0" : "") + (month + 1)),
    /**
     * 'Jan' à 'Dec'
     */
    M: (): string => SHORT_MONTHS_LANG_FR[month],
    /**
     * 1 à 12
     */
    n: (): number => month + 1,
    /**
     * 28 à 31
     */
    t: (): number => {
      let nextMonth = month + 1;
      if (nextMonth === 12) {
        year++;
        nextMonth = 0;
      }
      return new Date(year, nextMonth, 0).getDate();
    },
  };
}

/**
 * ANNÉE
 *
 * Représente les formats suivants:
 *   `L` -> Est ce que l'année est bissextile.
 *   `o` -> La numérotation de semaine dans l'année ISO-8601.
 *          C'est la même valeur que `Y`, excepté si le numéro de la semaine ISO (`W`) appartient à l'année précédente
 *          ou suivante, cette année sera utilisé à la place.
 *   `Y` -> Année sur 4 chiffres.
 *   `y` -> Année sur 2 chiffres.
 *
 * @return {DateKeyFormat}
 */
function yearFormats(this: Date): DateKeyFormat {
  const year = this.getFullYear();
  const day = this.getDay();

  return {
    /**
     * 1 si bissextile, 0 sinon.
     */
    L: (): number =>
      ~~(year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)),
    o: (): number => {
      const target = new Date(this.valueOf());
      target.setDate(target.getDate() - ((day + 6) % 7) + 3);
      return target.getFullYear();
    },
    Y: (): number => year,
    y: (): number => Number(String(year).substr(2)),
  };
}

/**
 * HEURE
 *
 * Représente les formats suivant:
 *   `a` -> Ante meridiem et Post meridiem en minuscules.
 *   `A` -> Ante meridiem et Post meridiem en majuscules.
 *   `B` -> Heure Internet Swatch.
 *   `g` -> Heure, au format 12h, sans les zéros initiaux.
 *   `G` -> Heure, au format 24h, sans les zéros initiaux.
 *   `h` -> Heure, au format 12h, avec les zéros initiaux.
 *   `H` -> Heure, au format 24h, avec les zéros initiaux.
 *   `i` -> Minutes avec les zéros initiaux.
 *   `s` -> Secondes, avec zéros initiaux.
 *   `u` -> Microsecondes.
 *
 * @return {DateKeyFormat}
 */
function hourFormats(this: Date): DateKeyFormat {
  const hours = this.getHours();
  const minutes = this.getMinutes();
  const seconds = this.getSeconds();
  const ms = this.getMilliseconds();

  return {
    a: (): string => hours < 12 ? "am" : "pm",

    A: (): string => hours < 12 ? "AM" : "PM",

    B: (): number =>
      Math.floor(
        (
          ((this.getUTCHours() + 1) % 24) +
          this.getUTCMinutes() / 60 +
          this.getUTCSeconds() / 3600
        ) * 1000 / 24,
      ),
    g: (): number => hours % 12 || 12,
    G: (): number => hours,
    h: (): number =>
      Number(((hours % 12 || 12) < 10 ? "0" : "") + (hours % 12 || 12)),
    H: (): number => Number((hours < 10 ? "0" : "") + hours),
    i: (): number => Number((minutes < 10 ? "0" : "") + minutes),
    s: (): number => Number((seconds < 10 ? "0" : "") + seconds),
    u: (): number => Number((ms < 10 ? "00" : (ms < 100 ? "0" : "")) + ms),
  };
}

/**
 * FUSEAU HORAIRE
 *
 * Représente les formats suivant: *   `e` -> L'identifiant du fuseau horaire.
 *   `I` (`i` majuscule) -> L'heure d'été est activée ou pas.
 *   `O` ->  Différence d'heures avec l'heure de Greenwich (GMT), exprimée en heures.
 *   `P` ->  Différence avec l'heure Greenwich (GMT) avec un deux-points entre les heures et les minutes.
 *   `T` ->  Abréviation du fuseau horaire.
 *   `Z` ->  Décalage horaire en secondes.
 *           Le décalage des zones à l'ouest de la zone UTC est négative, et à l'est, il est positif.
 *
 * @return {DateKeyFormat}
 */
function tzFormats(this: Date): DateKeyFormat {
  const offset = this.getTimezoneOffset();
  return {
    e: (): string => (/\((.*)\)/.exec(new Date().toString()) || [])[1],
    I: (): number => {
      const winterOffset = new Date(0).getTimezoneOffset();
      return ~~(offset !== winterOffset);
    },
    O: (): string => {
      const offsetD60 = Math.abs(offset / 60);
      const offsetM60 = Math.abs(offset % 60);
      return (-offset < 0 ? "-" : "+") +
        (offsetD60 < 10 ? "0" : "") +
        Math.floor(offsetD60) +
        (
          offsetM60 === 0 ? "00" : (offsetM60 < 10 ? "0" : "") + (offsetM60)
        );
    },
    P: (): string => {
      const offsetD60 = Math.abs(offset / 60);
      const offsetM60 = Math.abs(offset % 60);
      return (-offset < 0 ? "-" : "+") +
        (offsetD60 < 10 ? "0" : "") +
        Math.floor(offsetD60) + ":" +
        (
          offsetM60 === 0 ? "00" : (offsetM60 < 10 ? "0" : "") + (offsetM60)
        );
    },
    T: (): string => this.toTimeString().replace(/^.+ \(?([^)]+)\)?$/, "$1"),
    Z: (): number => offset * 60,
  };
}

/**
 * DATE ET HEURE COMPLÈTE
 *
 * Représente les formats suivant:
 *  `c` -> Date au format ISO 8601.
 *  `r` -> Format de date RFC 2822.
 *  `U` -> Secondes depuis l'époque Unix (1er Janvier 1970, 0h00 00s GMT).
 *
 * @return {DateKeyFormat}
 */
function fullTimeFormats(this: Date): DateKeyFormat {
  return {
    c: (): string => timestamp({ format: "Y-m-d\\TH:i:sP", time: this }),
    r: (): string => this.toString(),
    U: (): number => this.getTime() / 1000,
  };
}

function zeroPad(str: number | string): string {
  const $str = String(str);
  return $str.length === 1 ? "0" + $str : $str;
}

/**
 * Convertie une date en timestamp.
 */
export function timestamp(
  {
    format = "[H:i:s]",
    time = new Date(),
  }: {
    format?: string;
    time?: Date;
  },
): string {
  const replaceChars = {
    ...dayFormats.apply(time),
    ...weekFormats.apply(time),
    ...monthFormats.apply(time),
    ...yearFormats.apply(time),
    ...hourFormats.apply(time),
    ...tzFormats.apply(time),
    ...fullTimeFormats.apply(time),
  };

  return format.replace(
    /(\\?)(.)/g,
    (_, $esc, $chr) =>
      ($esc === "" && replaceChars[$chr])
        ? zeroPad(replaceChars[$chr].call([]))
        : $chr,
  );
}
