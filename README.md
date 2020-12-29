# Mes utilitaires pour JavaScript (écrit en TypeScript).

## Répertoires :
  - **shared/**: est un dossier contenant des sources "partagées", qui pourront tant bien être utilisées pour **node**, **deno** ou le **web** ;

  - **deno/**: est dossier contenant des utilitaires pour **[deno](https://deno.land/)** uniquement ;

    Pour utiliser l'un des utilitaires de ce répertoire, vous devez lancer votre commande `deno` avec l'option `--allow-read`.

    Qui requiert ce drapeau ?
    Il s'agit de l'utilitaire `readFile` du  fichier `fs.ts`.

  - **node/**: est dossier contenant des utilitaires pour **node** uniquement ;

  - **web/**: est un dossier contenant des utilitaires pour le **web** uniquement ;

## Récupérer ce projet ?
  - Télécharger le projet depuis un terminal en utilisant [git](https://git-scm.com), ou en téléchargeant le zip.

    Ligne de commande:
    > $   git clone https://github.com/PhiSyX/helpers

## Utiliser ce code pour les autres projets ?
  - Requiert d'avoir un projet pouvant compiler le typescript. (ou Deno).

  - Créer un [lien symbolique](https://fr.wikipedia.org/wiki/Lien_symbolique).

    Comme ce sont des sources qui pourront être partagées entre plusieurs projets, il est préférable de créer un lien symbolique.

    Sous Windows:
    > $   MKLINK /D "**PROJECT_TARGET**" "**REPO_GIT_FOLDER**"
    > > **PROJECT_TARGET**  "/mon/super/projet/personnel/helpers" \
    > > **REPO_GIT_FOLDER** "/dossier/téléchargé/helpers"
    >

  - Importer les utilitaires spécifiques dans les différents projets et les utiliser.

## Tests unitaires :
  Pour lancer les tests unitaires, il requiert [deno](https://deno.land/) d'installé sur son OS.

  Les fichiers de tests se terminent tous par **_test.ts**.

---

Pour lancer tous les tests unitaires:
  > $   deno test \*\*/\*_test.ts --allow-read

---

Pour lancer les tests unitaires d'un dossier en particulier
  > $   deno test **$DIRECTORY** [flags] \
  > $   deno test **$DIRECTORY**/*_test.ts [flags]

---

Pour lancer les tests unitaires d'un test en particulier
  > $   deno test **$DIRECTORY**/**$FILENAME**_test.ts [flags]
