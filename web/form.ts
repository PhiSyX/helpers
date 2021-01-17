import { toString } from "../shared/string.ts";

export function formData($form: string | HTMLFormElement) {
  if (typeof $form === "string") {
    const selector = toString($form);

    $form = document.querySelector(selector) as HTMLFormElement;

    if (!$form) {
      throw new Error(
        `[web/form/formData]: aucun élément n'a été trouvé avec le sélecteur "${selector}"`,
      );
    }
  }

  if (!$form) {
    throw new Error(
      `[web/form/formData]: il semble que votre argument résulte erroné.

        Signature de la fonction: formData($form: string | HTMLFormElement);
        Exemples corrects:
        const data1 = formData("#js-form");
        const data2 = formData(document.querySelector("#js-form"));`,
    );
  }

  return new FormData($form);
}
