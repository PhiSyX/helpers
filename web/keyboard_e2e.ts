import { isPrintableKey } from "./keyboard";

context("Keyboard", () => {
  beforeEach(() => {
    cy.visit("http://localhost:7357/");
  });

  it("[web/keyboard/isPrintableKey]: is key printable", () => {
    cy.window().then(() => {
      cy.get("#printable-keyboard-is-ok, #printable-keyboard-is-ko").then(
        ($) => {
          let $el_ok = $.get(0);
          let $el_ko = $.get(1);

          $el_ok.addEventListener("keydown", function (evt) {
            let is = isPrintableKey(evt);
            let key = evt.key;
            let isEnter = key == "Enter";

            if (key == "Backspace") {
              expect(is).to.be.false;
            } else if (key == "t") {
              expect(is).to.be.true;
            }

            if (isEnter) {
              $el_ok.textContent += "\n";
            }

            if (is) {
              $el_ok.textContent += key;
            } else {
              $el_ko.textContent += " " + key;
            }
          });
        },
      );

      cy.get("#printable-keyboard-is-ok").focus().type(
        "sall{backspace}u{del}t{enter} comment ça va ?{enter}",
        {
          delay: 100,
        },
      );
    });
  });
});
