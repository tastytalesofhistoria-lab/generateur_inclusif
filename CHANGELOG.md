# Log des mises à jour

Historique des évolutions du **Générateur inclusif**.

---

## V1.0 — Première version

Première version publique du générateur.

Ajouts principaux :

- création de l’interface HTML/CSS ;
- ajout d’une zone de texte original ;
- ajout d’une zone de texte inclusif ;
- ajout du bouton `Générer` ;
- ajout du bouton `Copier` ;
- ajout du bouton `Vider`.

---

## V1.1 — Pronoms inclusifs

Ajout et amélioration des conversions de pronoms.

Ajouts principaux :

- conversion de `il` vers `iel` ;
- conversion de `ils` vers `iels` ;
- conversion de `elle` vers `iel` ;
- conversion de `elles` vers `iels` ;
- conversion de formes comme `lui`, `eux`, `celle`, `celui`, `celles`, `ceux` ;
- meilleure gestion de `qu’il`, `qu’ils`, `qu’elle`, `qu’elles` ;
- ajout des options `Convertir il`, `Convertir elle` et `Convertir tous les pronoms`.

---

## V1.2 — Accords simples

Ajout des premiers accords inclusifs.

Ajouts principaux :

- accord de certains adjectifs ;
- gestion du singulier et du pluriel ;
- utilisation du point médian ;
- premières exceptions pour les adjectifs irréguliers ;
- correction des formes comme `fou / folle`, `heureux / heureuse`, `bon / bonne`, `gentil / gentille`.

---

## V1.3 — Optimisation Forumactif

Adaptation du générateur pour une utilisation sur Forumactif.

Ajouts et corrections :

- ajout de l’UTF-8 ;
- réduction des styles globaux ;
- meilleure compatibilité avec les pages HTML Forumactif ;
- iframe dédiée ;
- ajustement de la hauteur d’affichage ;
- amélioration du scroll entre les deux zones de texte.

---

## V1.4 — Métiers, rôles et noms de personnes

Ajout d’une gestion plus large des métiers et termes humains.

Ajouts principaux :

- prise en charge de métiers comme `acteur`, `directeur`, `professeur`, `vendeur`, `cuisinier` ;
- ajout de noms de personnes comme `étudiant`, `participant`, `intervenant`, `invité`, `habitant` ;
- correction de plusieurs formes au pluriel ;
- ajout d’une logique séparée pour éviter de traiter les objets comme des personnes.

---

## V1.5 — JSON externe

Déplacement d’une partie des correspondances vers un fichier externe.

Ajouts principaux :

- création du fichier `metiers-inclusive.json` ;
- chargement du dictionnaire via JavaScript ;
- allègement du code principal ;
- meilleure organisation du projet pour GitHub Pages.

---

## V1.6 — Protection des épicènes

Ajout d’une protection des termes épicènes.

Ajouts et corrections :

- protection de mots déjà neutres comme `digne`, `sincère`, `calme`, `libre`, `utile`, `jeune`, `responsable` ;
- protection de certains noms épicènes comme `journaliste`, `photographe`, `collègue`, `membre`, `artiste` ;
- gestion du pluriel des épicènes ;
- retrait de faux épicènes qui devaient encore être accordés ;
- réduction des accords abusifs sur certains mots.

---

## V1.7 — Corrections d’accords et bugs

Corrections liées aux tests utilisateurs.

Corrections principales :

- amélioration des accords au pluriel ;
- correction de mots qui ne s’accordaient plus ;
- correction de certains métiers restant au masculin ;
- amélioration des terminaisons inclusives ;
- limitation des transformations sur les verbes ;
- ajout d’exceptions pour éviter des formes incorrectes comme des verbes accordés à tort ;
- amélioration progressive du comportement sur les textes longs.

---

## V1.8 — Séparation des fichiers

Réorganisation du projet pour alléger le fichier principal.

Ajouts principaux :

- séparation du CSS dans `assets/style.css` ;
- séparation du JavaScript dans `assets/generateur.js` ;
- déplacement des dictionnaires dans le dossier `data/` ;
- déplacement de `metiers-inclusive.json` dans `data/` ;
- création de fichiers dédiés pour les pronoms, adjectifs, épicènes, exclusions et verbes protégés ;
- nettoyage du `index.html`, devenu plus léger et plus lisible.

---

## V1.9 — Mode Neutralité

Ajout d’un mode global de neutralisation du texte.

Ajouts principaux :

- ajout d’une option `Neutralité` dans l’interface ;
- activation automatique des conversions liées à `il` et `elle` lorsque la neutralité est cochée ;
- activation des conversions pronominales étendues en mode neutralité ;
- neutralisation des métiers, rôles et noms de personnes connus ;
- neutralisation de certains adjectifs accordés ;
- conservation des termes épicènes déjà neutres ;
- maintien des protections pour éviter de transformer des objets ou des verbes à tort.

---

## V2.0 — Déterminants neutres

Ajout d’une gestion des déterminants humains en mode neutralité.

Ajouts principaux :

- conversion de `le`, `la`, `l’` vers `li` devant les mots humains reconnus ;
- conversion de `du`, `de la`, `de l’` vers `de li` devant les mots humains reconnus ;
- conversion de `au`, `à la`, `à l’` vers `à li` devant les mots humains reconnus ;
- conversion de `un` et `une` vers `un·e` devant les mots humains reconnus ;
- conversion de `ce`, `cet`, `cette` vers `ce·tte` devant les mots humains reconnus ;
- ajout d’une vérification contextuelle pour éviter de transformer les objets.

Exemple :

```txt
Le journaliste calme parle à la directrice.
