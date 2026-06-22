<div align="center">

# Générateur inclusif

**Un générateur d’écriture inclusive en français, libre d’accès, non lucratif et pensé pour la communauté.**

[Accéder au générateur](https://tastytalesofhistoria-lab.github.io/generateur_inclusif/)

</div>

---

## Présentation

Le **Générateur inclusif** est un outil en ligne permettant de transformer rapidement un texte genré en version plus inclusive.

Il a été pensé pour les usages communautaires, créatifs, associatifs, rôlistes et forumactifs.

Le projet est développé dans un but **non lucratif** et reste **libre d’accès pour toute la communauté**.

---

## Fonctionnalités

Le générateur permet actuellement de :

- convertir les pronoms liés à `il` ;
- convertir les pronoms liés à `elle` ;
- convertir un ensemble plus large de pronoms et formes associées ;
- accorder certains adjectifs ;
- accorder certains noms de personnes, métiers, rôles et fonctions ;
- protéger certains termes épicènes ;
- charger une liste externe de métiers et fonctions via JSON ;
- copier facilement le texte généré.

---

## Accès au générateur

Le générateur est disponible ici :

```txt
https://tastytalesofhistoria-lab.github.io/generateur_inclusif/
```

---

## Utilisation sur Forumactif

Pour intégrer le générateur sur Forumactif, utiliser cette iframe :

```html
<iframe src="https://tastytalesofhistoria-lab.github.io/generateur_inclusif/" style="width:100%;height:1200px;border:0;" scrolling="no"></iframe>
```

---

## Structure du projet

```txt
generateur_inclusif/
├─ index.html
├─ metiers-inclusive.json
└─ README.md
```

### `index.html`

Contient l’interface du générateur, le HTML, le CSS et le JavaScript principal.

### `metiers-inclusive.json`

Contient les correspondances pour les métiers, fonctions, rôles et noms de personnes.

Exemple :

```json
{
  "acteur": "acteur·ice",
  "actrice": "acteur·ice",
  "acteurs": "acteur·ice·s",
  "actrices": "acteur·ice·s"
}
```

### `README.md`

Présente le projet, son usage, ses limites et son historique de mises à jour.

---

## But du projet

Ce projet est :

- gratuit ;
- non lucratif ;
- libre d’accès ;
- pensé pour la communauté ;
- amélioré progressivement selon les retours.

Il peut être utilisé dans un cadre personnel, communautaire, associatif, créatif ou rôliste.

Merci de ne pas revendre l’outil tel quel ni de le présenter comme une création propriétaire fermée.

---

## Limites

La langue française contient beaucoup d’exceptions, d’accords contextuels et de cas ambigus.

Le générateur peut donc :

- rater certains accords ;
- transformer certains mots à tort ;
- ne pas reconnaître tous les métiers ;
- mal gérer certaines phrases complexes ;
- nécessiter une relecture humaine.

L’objectif n’est pas de remplacer une correction manuelle, mais de proposer une base rapide et pratique.

---

## Contribution

Les retours sont bienvenus.

Il est possible de proposer :

- des métiers ou fonctions à ajouter ;
- des mots épicènes à protéger ;
- des corrections d’accord ;
- des exemples de phrases problématiques ;
- des améliorations du code ou de l’interface.

---

## Log des mises à jour

### V1.0 — Première version

Première version publique du générateur.

Ajouts principaux :

- création de l’interface HTML/CSS ;
- ajout d’une zone de texte original ;
- ajout d’une zone de texte inclusif ;
- ajout du bouton `Générer` ;
- ajout du bouton `Copier` ;
- ajout du bouton `Vider` ;
- première intégration possible via iframe Forumactif.

---

### V1.1 — Pronoms inclusifs

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

### V1.2 — Accords simples

Ajout des premiers accords inclusifs.

Ajouts principaux :

- accord de certains adjectifs ;
- gestion du singulier et du pluriel ;
- utilisation du point médian ;
- premières exceptions pour les adjectifs irréguliers ;
- correction des formes comme `fou / folle`, `heureux / heureuse`, `bon / bonne`, `gentil / gentille`.

---

### V1.3 — Optimisation Forumactif

Adaptation du générateur pour une utilisation sur Forumactif.

Ajouts et corrections :

- ajout de l’UTF-8 ;
- nettoyage du HTML ;
- réduction des styles globaux ;
- meilleure compatibilité avec les pages HTML Forumactif ;
- iframe dédiée ;
- ajustement de la hauteur d’affichage ;
- amélioration du scroll entre les deux zones de texte.

---

### V1.4 — Métiers, rôles et noms de personnes

Ajout d’une gestion plus large des métiers et termes humains.

Ajouts principaux :

- prise en charge de métiers comme `acteur`, `directeur`, `professeur`, `vendeur`, `cuisinier` ;
- ajout de noms de personnes comme `étudiant`, `participant`, `intervenant`, `invité`, `habitant` ;
- début de conversion automatique des terminaisons humaines ;
- correction de plusieurs formes au pluriel ;
- ajout d’une logique séparée pour éviter de traiter les objets comme des personnes.

---

### V1.5 — JSON externe

Déplacement d’une partie des correspondances vers un fichier externe.

Ajouts principaux :

- création du fichier `metiers-inclusive.json` ;
- chargement du dictionnaire via JavaScript ;
- allègement du code principal ;
- possibilité d’ajouter des métiers sans modifier toute la logique du générateur ;
- meilleure organisation du projet pour GitHub Pages.

---

### V1.6 — Protection des épicènes

Ajout d’une protection des termes épicènes.

Ajouts et corrections :

- protection de mots déjà neutres comme `digne`, `sincère`, `calme`, `libre`, `utile`, `jeune`, `responsable` ;
- protection de certains noms épicènes comme `journaliste`, `photographe`, `collègue`, `membre`, `artiste` ;
- gestion du pluriel des épicènes ;
- retrait de faux épicènes qui devaient encore être accordés ;
- réduction des accords abusifs sur certains mots.

---

### V1.7 — Corrections d’accords et bugs

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

## Statut actuel

Le générateur est fonctionnel, mais encore en amélioration.

Les prochaines améliorations prévues peuvent inclure :

- enrichissement du fichier `metiers-inclusive.json` ;
- ajout de nouvelles exceptions grammaticales ;
- meilleure détection des verbes ;
- meilleure distinction entre noms de personnes, adjectifs et objets ;
- amélioration de l’interface ;
- ajout d’un système de tests avec exemples avant/après.

---

## Note finale

Ce générateur est un outil communautaire.

Il est proposé gratuitement, dans une démarche d’accessibilité, d’entraide et d’amélioration progressive.

Une relecture humaine reste recommandée après génération.
