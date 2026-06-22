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
```

devient :

```txt
Li journaliste calme parle à li directeur·ice.
```

---

## V2.1 — Interface compacte des options

Réorganisation visuelle des options du générateur.

Ajouts et corrections :

- remplacement de la liste simple de cases par une barre d’options compacte ;
- réduction de la hauteur occupée dans l’iframe ;
- amélioration de la lisibilité des options ;
- renommage visuel des boutons :
  - `Il → iel` ;
  - `Elle → iel` ;
  - `Tous les pronoms` ;
  - `Neutralité` ;
- ajout d’un style plus clair pour l’option `Neutralité` ;
- adaptation responsive pour mobile et petits écrans.

---

## V2.2 — Description dynamique des options

Ajout d’une description automatique sous les options.

Ajouts principaux :

- la description change selon les cases cochées ;
- affichage d’un texte spécifique pour la conversion ciblée ;
- affichage d’un texte spécifique pour la conversion étendue ;
- affichage d’un texte spécifique pour le mode neutralité ;
- affichage d’un message lorsqu’aucune conversion n’est active ;
- mise à jour automatique de la description au clic sur une option.

---

## V2.3 — Corrections et stabilisation du générateur

Corrections liées à la séparation des fichiers et aux nouvelles options.

Corrections principales :

- vérification des identifiants HTML utilisés par le JavaScript ;
- conservation du chemin `data/metiers-inclusive.json` ;
- ajout d’une sécurité si certains éléments HTML ne sont pas encore chargés ;
- correction des écouteurs d’événements des options ;
- ajout d’une fonction commune `optionChange()` ;
- réduction des conflits entre neutralité, accords automatiques et mots protégés ;
- limitation des transformations automatiques trop larges ;
- meilleure protection contre les transformations abusives sur les verbes et les objets.

---

## V2.4 — Protection des tournures impersonnelles

Correction d’un bug où certains `il` impersonnels étaient transformés à tort en `iel`.

Corrections principales :

- ajout d’un système de protection temporaire des expressions figées avant conversion ;
- restauration automatique des expressions protégées après génération ;
- protection de tournures impersonnelles comme :
  - `il faut` ;
  - `il ne faut pas` ;
  - `il faudrait` ;
  - `il fallait` ;
  - `il faudra` ;
  - `il y a` ;
  - `il y avait` ;
  - `il y aura` ;
  - `il s’agit` ;
  - `il existe` ;
  - `il reste` ;
  - `il suffit` ;
  - `il semble` ;
  - `il paraît` ;
  - `il vaut mieux` ;
  - `il est possible de` ;
  - `il est nécessaire que` ;
  - `il fait froid` ;
  - `il pleut` ;
  - `il va neiger` ;
- correction du cas problématique `Alors il faut...`, qui ne doit plus devenir `Alors iel faut...`.

Exemple corrigé :

```txt
Il s’habille comme il peut. Alors il faut de bonnes chaussures.
```

devient :

```txt
Iel s’habille comme iel peut. Alors il faut de bonnes chaussures.
```

---

## V2.5 — Protection des expressions de périodicité

Correction des transformations abusives de `tous` et `toutes` dans les expressions de fréquence.

Corrections principales :

- protection de formes comme :
  - `tous les jours` ;
  - `tous les matins` ;
  - `tous les soirs` ;
  - `tous les mois` ;
  - `tous les ans` ;
  - `tous les lundis` ;
  - `toutes les semaines` ;
  - `toutes les nuits` ;
  - `toutes les fois` ;
  - `tous les deux jours` ;
  - `toutes les trois semaines` ;
- retrait de la conversion automatique directe de `tous` / `toutes` depuis les règles de pronoms ;
- conservation de la conversion vers `toustes` uniquement lorsqu’un contexte humain est détecté.

Exemple corrigé :

```txt
Comme tous les jours.
```

reste :

```txt
Comme tous les jours.
```

Mais :

```txt
Tous les étudiants sont présents.
```

peut devenir :

```txt
Toustes les étudiant·e·s sont présent·e·s.
```

---

## V2.6 — Stabilisation du générateur

Nettoyage et sécurisation du JavaScript principal.

Corrections principales :

- réorganisation du fichier `assets/generateur.js` ;
- ajout d’un ordre de traitement plus sûr :
  - protection des expressions figées ;
  - conversion des pronoms ;
  - neutralisation des déterminants ;
  - accords ;
  - nettoyage ;
  - restauration des expressions protégées ;
- sécurisation des éléments HTML manquants ;
- sécurisation des écouteurs d’événements ;
- ajout de la fonction utilitaire `bind()` ;
- amélioration de la stabilité générale du générateur.

 
