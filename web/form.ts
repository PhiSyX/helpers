import { toString } from "../shared/string.ts";

export function formData($form: string | HTMLFormElement) {
  if (typeof $form === "string") {
    const selector = toString($form);

    $form = document.querySelector(selector);

    if (!$form) {
      throw new Error(
        `Aucun élément n'a été trouvé avec le sélecteur "${selector}"`,
      );
    }
  }

  return new FormData($form);
}
