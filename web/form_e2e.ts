import { formData } from "./form.ts";

context("Form", () => {
  beforeEach(() => {
    cy.visit("http://localhost:7357/");
  });

  it("[web/form/formData]: récupération des données", () => {
    cy.get("#field-a-1").type("coucou", { delay: 100 });
    cy.get("#field-b-1").type("comment", { delay: 100 });
    cy.get("#field-c-1").type("va-t-on ?", { delay: 100 });

    cy.get("#js-form-1").should((el) => {
      const data = formData(el[0] as any);
      expect(data.get("a")).to.equal("coucou");
      expect(data.get("b")).to.equal("comment");
      expect(data.get("c")).to.equal("va-t-on ?");
    });

    cy.get("#js-form-2").should((el) => {
      const data = formData(el[0] as any);
      expect(data.get("a")).to.equal("");
      expect(data.get("b")).to.equal("");
      expect(data.get("c")).to.equal("");
    });
  });
});
