import type { FIXME } from "../shared/types.d.ts";

import { assertEquals, assertNotEquals } from "../deno/test_mod.ts";

import { format, parse } from "./text.ts";
import { IrcNick } from "./nick.ts";

// ! FIXME : utilisez un système de mock, stub, spy
const formatMap = (b: FIXME) => {
  const id = "my-id";
  return { ...b, id };
};

Deno.test(
  "[irc/text/format]: base",
  () => {
    const bold = [
      "\u0002je suis un texte en gras",
    ].join("");
    const { formatted: fbold } = format(bold);
    assertEquals(fbold.map(formatMap), [
      {
        id: "my-id",
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
    assertEquals(fitalic.map(formatMap), [
      {
        id: "my-id",
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
    assertEquals(funderline.map(formatMap), [
      {
        id: "my-id",
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
    assertEquals(freverse.map(formatMap), [
      {
        id: "my-id",
        background: 0,
        bold: false,
        foreground: 0,
        italic: false,
        reverse: false,
        text: "je suis un ",
        underline: false,
      },
      {
        id: "my-id",
        background: 0,
        bold: false,
        foreground: 0,
        italic: false,
        reverse: true,
        text: "texte en reverse",
        underline: false,
      },
      {
        id: "my-id",
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
    assertEquals(fcolorFG.map(formatMap), [
      {
        id: "my-id",
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
    assertEquals(fcolorBG.map(formatMap), [
      {
        id: "my-id",
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
    assertEquals(freset.map(formatMap), [
      {
        id: "my-id",
        background: 0,
        bold: true,
        foreground: 0,
        italic: false,
        reverse: false,
        text: "je suis un texte en gras.",
        underline: false,
      },
      {
        id: "my-id",
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
    assertEquals(fping.map(formatMap), [
      {
        id: "my-id",
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
    assertEquals(fsujet.map(formatMap), [
      {
        id: "my-id",
        background: 0,
        bold: false,
        foreground: 0,
        italic: false,
        reverse: false,
        text: "S",
        underline: false,
      },
      {
        id: "my-id",
        background: 4,
        bold: false,
        foreground: 4,
        italic: false,
        reverse: false,
        text: "alut t",
        underline: false,
      },
      {
        id: "my-id",
        background: 4,
        bold: false,
        foreground: 4,
        italic: false,
        reverse: false,
        text: "out l",
        underline: true,
      },
      {
        id: "my-id",
        background: 4,
        bold: true,
        foreground: 4,
        italic: false,
        reverse: false,
        text: 'e mo<img src="x" onerror=alert(1)>nd',
        underline: true,
      },
      {
        id: "my-id",
        background: 4,
        bold: true,
        foreground: 4,
        italic: false,
        reverse: false,
        text: "e commen",
        underline: false,
      },
      {
        id: "my-id",
        background: 4,
        bold: true,
        foreground: 4,
        italic: true,
        reverse: false,
        text: "t ça v",
        underline: false,
      },
      {
        id: "my-id",
        background: 4,
        bold: false,
        foreground: 4,
        italic: true,
        reverse: false,
        text: "a ? Bie",
        underline: false,
      },
      {
        id: "my-id",
        background: 5,
        bold: false,
        foreground: 8,
        italic: true,
        reverse: false,
        text: "n m",
        underline: false,
      },
      {
        id: "my-id",
        background: 5,
        bold: false,
        foreground: 8,
        italic: true,
        reverse: true,
        text: "erc",
        underline: false,
      },
      {
        id: "my-id",
        background: 5,
        bold: false,
        foreground: 8,
        italic: true,
        reverse: false,
        text: "i l",
        underline: false,
      },
      {
        id: "my-id",
        background: 0,
        bold: false,
        foreground: 10,
        italic: true,
        reverse: false,
        text: "ol xD",
        underline: false,
      },
      {
        id: "my-id",
        background: 0,
        bold: false,
        foreground: 10,
        italic: false,
        reverse: false,
        text: ". Ceci est une phrase de test, merc",
        underline: false,
      },
      {
        id: "my-id",
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
  "[irc/text/format]: format à la fin",
  () => {
    const end = [
      "\u000314,12Lorem ipsum dolor <strong>lol</strong> sit amet consectetur adipisicing elit. In porro voluptatem quia debitis, exercitationem, laudantium, possimus voluptatum ut beatae sapiente alias? Rem molestiae porro repudiandae amet. Vero pariatur facere veniam.\u000f",
    ].join("");
    const { formatted: fend } = format(end);
    assertEquals(fend.map(formatMap), [
      {
        id: "my-id",
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
  "[irc/text/parse]: RPL,ERR",
  () => {
    const raw =
      ":irc.local.web 001 PhiSyX :Welcome to the LocalWEB IRC Network PhiSyX!PhiSyX@localhost";
    const echo = [parse(raw)].map(formatMap);

    assertEquals(echo, [{
      id: "my-id",
      raw: raw,
      receivedAt: new Date(),
      prefix: "irc.local.web",
      type: "RPL_WELCOME",
      args: [
        "PhiSyX",
        "Welcome to the LocalWEB IRC Network PhiSyX!PhiSyX@localhost",
      ],
    }]);

    const raw2 =
      ":irc.local.web 005 PhiSyX AWAYLEN=307 BOT=B CASEMAPPING=ascii CHANLIMIT=#:10 CHANMODES=beI,kLf,lH,psmntirzMQNRTOVKDdGPZSCc CHANNELLEN=32 CHANTYPES=# CLIENTTAGDENY=*,-draft/typing,-typing DEAF=d ELIST=MNUCT EXCEPTS EXTBAN=~,GptmTSOcarnqjf :are supported by this server";
    const echo2 = [parse(raw2)].map(formatMap);

    assertEquals(echo2, [{
      id: "my-id",
      raw: raw2,
      receivedAt: new Date(),
      prefix: "irc.local.web",
      type: "RPL_ISUPPORT",
      args: [
        "PhiSyX",
        "AWAYLEN=307",
        "BOT=B",
        "CASEMAPPING=ascii",
        "CHANLIMIT=#:10",
        "CHANMODES=beI,kLf,lH,psmntirzMQNRTOVKDdGPZSCc",
        "CHANNELLEN=32",
        "CHANTYPES=#",
        "CLIENTTAGDENY=*,-draft/typing,-typing",
        "DEAF=d",
        "ELIST=MNUCT",
        "EXCEPTS",
        "EXTBAN=~,GptmTSOcarnqjf",
        "are supported by this server",
      ],
    }]);
  },
);

Deno.test(
  "[irc/text/parse]: JOIN TYPE",
  () => {
    const raw =
      "@time=2021-01-27T18:23:33.370Z;msgid=jeX5MdBcijcvuGhjtRrZMv-ZMjIgxkygJW6Z5Vlgt//jA :PhiSyX!PhiSyX@iBug-DB07A864 JOIN #iBug * :WebSocket User";
    const echo = parse(raw);

    assertEquals(echo.type, "JOIN");
    assertEquals(echo.target, "#iBug");
    assertEquals(echo.nick instanceof IrcNick, true);
    assertEquals(echo.nick.nick, "PhiSyX");
    assertEquals(echo.nick.realname.raw, "WebSocket User");
  },
);

Deno.test(
  "[irc/text/parse]: PART TYPE",
  () => {
    const raw =
      "@time=2021-01-27T27T18:46:09.437Z;msgid=ND8D1HvMainMIrTvhL9w4J-9NKoGTlw2e9RpOMPqf6iRg :PhiSyX!PhiSyX@iBug-DB07A864 PART #iBug";

    const echo = parse(raw);

    assertEquals(echo.type, "PART");
    assertEquals(echo.target, "#iBug");
    assertEquals(echo.reason.raw, "");

    const raw2 =
      "@time=2021-01-27T27T18:46:09.437Z;msgid=ND8D1HvMainMIrTvhL9w4J-9NKoGTlw2e9RpOMPqf6iRg :PhiSyX!PhiSyX@iBug-DB07A864 PART #iBug :avec une raison particulière?";
    const echo2 = parse(raw2);
    assertNotEquals(echo2.reason.raw, "");
    assertEquals(echo2.reason.raw, "avec une raison particulière?");
  },
);

Deno.test(
  "[irc/text/parse]: MODE TYPE",
  () => {
    const raw =
      "@time=2021-01-27T18:23:33.370Z;msgid=jeX5MdBcijcvuGhjtRrZMv-ftGu6IxyHLVXjRJRm3QQuQ :irc.local.web MODE #iBug +nt";
    const echo = parse(raw);

    assertEquals(echo.type, "MODE");
    assertNotEquals(echo.type, "JOIN");

    assertEquals(echo.args, ["+nt"]);
    assertEquals(echo.nick?.realname, undefined);

    const raw2 =
      "@time=2021-01-27T18:53:53.201Z;msgid=LDh81On1sFXbYHnbmj7lhN :僕はMiku!PhiSyX@netadmin.example.org MODE #iBug +v 僕はMiku";
    const echo2 = parse(raw2);
    assertEquals(echo2.type, "MODE");

    assertEquals(echo2.args, ["+v", "僕はMiku"]);
    assertEquals(echo2.nick.realname, undefined);

    const raw3 =
      "@time=2021-01-27T18:57:51.251Z;msgid=siM9scudjiWVFqZoOuQVOa :PhiSyX!PhiSyX@iBug-DB07A864 MODE #ibug +bb *!*foo*@* *!*bar*@*";
    const echo3 = parse(raw3);
    assertEquals(echo3.args, ["+bb", "*!*foo*@*", "*!*bar*@*"]);
  },
);

Deno.test(
  "[irc/text/parse]: KICK",
  () => {
    const raw =
      "@time=2021-01-27T18:51:17.818Z;msgid=r3RidAvCFMDIfoB0EPKaWg-o02ggQ5LaalsNtfea1sA9g :僕はMiku!PhiSyX@netadmin.example.org KICK #iBug Jefaisuntest :Dehors !";
    const echo = parse(raw);

    assertEquals(echo.type, "KICK");
    assertEquals(echo.victim, "Jefaisuntest");
    assertEquals(echo.nick.nick, "僕はMiku");
    assertEquals(echo.reason.raw, "Dehors !");
  },
);

Deno.test(
  "[irc/text/parse]: PRIVMSG",
  () => {
    const raw =
      "@time=2021-01-27T18:25:02.040Z;msgid=SdhqVrx2ryc7xESS8P0r3p :僕はMiku!PhiSyX@netadmin.example.org PRIVMSG Pseudo :salut à tous :)";
    const echo = parse(raw);

    assertEquals(echo.type, "PRIVMSG");

    assertEquals(echo.target, "Pseudo");
    assertNotEquals(echo.target, "#iBug");

    assertEquals(echo.nick.nick, "僕はMiku");
    assertEquals(echo.message.raw, "salut à tous :)");
  },
);

Deno.test(
  "[irc/text/parse]: TOPIC",
  () => {
    const raw =
      "@time=2021-01-27T18:09:19.337Z;msgid=SiCzdPygaGoToMz8Jg9gLS :lol!PhiSyX@netadmin.example.org TOPIC #foo :bar";
    const echo = parse(raw);

    assertEquals(echo.type, "TOPIC");
    assertEquals(echo.target, "#foo");
    assertEquals(echo.topic.raw, "bar");

    // sans log d'ircop
    assertEquals(echo.nick.userhost, null);
    assertEquals(echo.nick.userip, null);
  },
);

Deno.test(
  "[irc/text/parse]: IRCop data",
  () => {
    const raw =
      "@unrealircd.org/userhost=PhiSyX@localhost;unrealircd.org/userip=PhiSyX@127.0.0.1;time=2021-01-27T18:09:19.337Z;msgid=SiCzdPygaGoToMz8Jg9gLS :lol!PhiSyX@netadmin.example.org TOPIC #foo :bar";
    const echo = parse(raw);

    assertEquals(echo.type, "TOPIC");
    assertEquals(echo.target, "#foo");
    assertEquals(echo.topic.raw, "bar");

    // avec log d'ircop
    assertEquals(echo.nick.userhost, "PhiSyX@localhost");
    assertEquals(echo.nick.userip, "PhiSyX@127.0.0.1");
  },
);
