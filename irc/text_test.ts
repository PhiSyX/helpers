import { assertEquals, testdataDir } from "../deno/test_mod.ts";

import { readFile } from "../deno/fs.ts";

import { format, parse } from "./text.ts";

Deno.test(
  "[irc/text/format]: base",
  () => {
    const bold = [
      "\u0002je suis un texte en gras",
    ].join("");
    const { formatted: fbold } = format(bold);
    assertEquals(fbold, [
      {
        background: 0,
        bold: true,
        foreground: 0,
        italic: false,
        reverse: false,
        text: "je suis un texte en gras",
        underline: false,
      },
    ]);

    const italic = ["\u001Dje suis un texte en italique"].join("");
    const { formatted: fitalic } = format(italic);
    assertEquals(fitalic, [
      {
        background: 0,
        bold: false,
        foreground: 0,
        italic: true,
        reverse: false,
        text: "je suis un texte en italique",
        underline: false,
      },
    ]);

    const underline = ["\u001Fje suis un texte en souligné"].join("");
    const { formatted: funderline } = format(underline);
    assertEquals(funderline, [
      {
        background: 0,
        bold: false,
        foreground: 0,
        italic: false,
        reverse: false,
        text: "je suis un texte en souligné",
        underline: true,
      },
    ]);

    const reverse = ["je suis un \u0016texte en reverse\u0016 :-)"].join("");
    const { formatted: freverse } = format(reverse);
    assertEquals(freverse, [
      {
        background: 0,
        bold: false,
        foreground: 0,
        italic: false,
        reverse: false,
        text: "je suis un ",
        underline: false,
      },
      {
        background: 0,
        bold: false,
        foreground: 0,
        italic: false,
        reverse: true,
        text: "texte en reverse",
        underline: false,
      },
      {
        background: 0,
        bold: false,
        foreground: 0,
        italic: false,
        reverse: false,
        text: " :-)",
        underline: false,
      },
    ]);

    const colorFG = ["\u000312je suis un texte en couleur 12"].join("");
    const { formatted: fcolorFG } = format(colorFG);
    assertEquals(fcolorFG, [
      {
        background: 0,
        bold: false,
        foreground: 12,
        italic: false,
        reverse: false,
        text: "je suis un texte en couleur 12",
        underline: false,
      },
    ]);

    const colorBG = ["\u000312,04je suis un texte en couleur 12,04"].join("");
    const { formatted: fcolorBG } = format(colorBG);
    assertEquals(fcolorBG, [
      {
        background: 4,
        bold: false,
        foreground: 12,
        italic: false,
        reverse: false,
        text: "je suis un texte en couleur 12,04",
        underline: false,
      },
    ]);

    const reset = [
      "\u0002je suis un texte en gras.\u000F Mais ce texte est normal",
    ].join("");
    const { formatted: freset } = format(reset);
    assertEquals(freset, [
      {
        background: 0,
        bold: true,
        foreground: 0,
        italic: false,
        reverse: false,
        text: "je suis un texte en gras.",
        underline: false,
      },
      {
        background: 0,
        bold: false,
        foreground: 0,
        italic: false,
        reverse: false,
        text: " Mais ce texte est normal",
        underline: false,
      },
    ]);
  },
);

Deno.test(
  "[irc/text/format]: ctcp, version...",
  () => {
    const ping = [
      "\u0001PING 1473523796 918320\u0001",
    ].join("");
    const { formatted: fping } = format(ping);
    assertEquals(fping, [
      {
        background: 0,
        bold: false,
        foreground: 0,
        italic: false,
        reverse: false,
        text: "PING 1473523796 918320",
        underline: false,
      },
    ]);
  },
);

Deno.test(
  "[irc/text/format]: multiple",
  () => {
    const sujet = [
      'S\u000304,4alut tout l\u0002e mo<img src="x" onerror=alert(1)>nde comment ça ',
      "v\u0002a ? Bie\u000308,05n merci l\u000310ol xD. Ceci est une phrase de test, ",
      "merc\u0003i de ne pas le prendre en compte",
    ].join("");

    const { formatted: fsujet } = format(sujet);
    assertEquals(fsujet, [
      {
        background: 0,
        bold: false,
        foreground: 0,
        italic: false,
        reverse: false,
        text: "S",
        underline: false,
      },
      {
        background: 4,
        bold: false,
        foreground: 4,
        italic: false,
        reverse: false,
        text: "alut t",
        underline: false,
      },
      {
        background: 4,
        bold: false,
        foreground: 4,
        italic: false,
        reverse: false,
        text: "out l",
        underline: true,
      },
      {
        background: 4,
        bold: true,
        foreground: 4,
        italic: false,
        reverse: false,
        text: 'e mo<img src="x" onerror=alert(1)>nd',
        underline: true,
      },
      {
        background: 4,
        bold: true,
        foreground: 4,
        italic: false,
        reverse: false,
        text: "e commen",
        underline: false,
      },
      {
        background: 4,
        bold: true,
        foreground: 4,
        italic: true,
        reverse: false,
        text: "t ça v",
        underline: false,
      },
      {
        background: 4,
        bold: false,
        foreground: 4,
        italic: true,
        reverse: false,
        text: "a ? Bie",
        underline: false,
      },
      {
        background: 5,
        bold: false,
        foreground: 8,
        italic: true,
        reverse: false,
        text: "n m",
        underline: false,
      },
      {
        background: 5,
        bold: false,
        foreground: 8,
        italic: true,
        reverse: true,
        text: "erc",
        underline: false,
      },
      {
        background: 5,
        bold: false,
        foreground: 8,
        italic: true,
        reverse: false,
        text: "i l",
        underline: false,
      },
      {
        background: 0,
        bold: false,
        foreground: 10,
        italic: true,
        reverse: false,
        text: "ol xD",
        underline: false,
      },
      {
        background: 0,
        bold: false,
        foreground: 10,
        italic: false,
        reverse: false,
        text: ". Ceci est une phrase de test, merc",
        underline: false,
      },
      {
        background: 0,
        bold: false,
        foreground: 0,
        italic: false,
        reverse: false,
        text: "i de ne pas le prendre en compte",
        underline: false,
      },
    ]);
  },
);

Deno.test(
  "irc/text/format: format à la fin",
  () => {
    const end = [
      "\u000314,12Lorem ipsum dolor <strong>lol</strong> sit amet consectetur adipisicing elit. In porro voluptatem quia debitis, exercitationem, laudantium, possimus voluptatum ut beatae sapiente alias? Rem molestiae porro repudiandae amet. Vero pariatur facere veniam.\u000f",
    ].join("");
    const { formatted: fend } = format(end);
    assertEquals(fend, [
      {
        background: 12,
        bold: false,
        foreground: 14,
        italic: false,
        reverse: false,
        text:
          "Lorem ipsum dolor <strong>lol</strong> sit amet consectetur adipisicing elit. In porro voluptatem quia debitis, exercitationem, laudantium, possimus voluptatum ut beatae sapiente alias? Rem molestiae porro repudiandae amet. Vero pariatur facere veniam.",
        underline: false,
      },
    ]);
  },
);

Deno.test(
  "[irc/text/parse]: base",
  async () => {
    const logsData: string[] = await readFile(
      testdataDir(import.meta.url) + "/logs.json",
      "json",
    );

    const logs = logsData.map(parse);
    assertEquals(logs[0], {
      raw:
        "2020-11-01@18:37:50 Modes: NickName!NickIdent@Network-encrypted-host.fai.org : +bb *!*@*encrypted.mob.fai.org *!*NickIdent@*",
      createdAt: new Date("2020-11-01@18:37:50"),
      type: "MODES",
      nick: {
        nick: "NickName",
        ident: "NickIdent",
        hostname: "Network-encrypted-host.fai.org",
      },
      message: [
        {
          background: 0,
          bold: false,
          foreground: 0,
          italic: false,
          reverse: false,
          underline: false,
          text: "+bb *!*@*encrypted.mob.fai.org *!*NickIdent@*",
        },
      ],
    });
    assertEquals(logs[5], {
      raw:
        "2021-01-21@18:39:40 Kick: fakeNick_2!fakeIdent_2@fake-encrypted.host_2.fai.org par fakeNick!fakeIdent@fake-encrypted.host.fai.org : Demandé \u0002si\u0002 gentiment :)",
      createdAt: new Date("2021-01-21@18:39:40"),
      type: "KICK",
      nick: {
        nick: "fakeNick",
        ident: "fakeIdent",
        hostname: "fake-encrypted.host.fai.org",
      },
      victim: {
        nick: "fakeNick_2",
        ident: "fakeIdent_2",
        hostname: "fake-encrypted.host_2.fai.org",
      },
      reason: [
        {
          background: 0,
          bold: false,
          foreground: 0,
          italic: false,
          reverse: false,
          underline: false,
          text: "Demandé ",
        },
        {
          background: 0,
          bold: true,
          foreground: 0,
          italic: false,
          reverse: false,
          underline: false,
          text: "si",
        },
        {
          background: 0,
          bold: false,
          foreground: 0,
          italic: false,
          reverse: false,
          underline: false,
          text: " gentiment :)",
        },
      ],
    });
  },
);
