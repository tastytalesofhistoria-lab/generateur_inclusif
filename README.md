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
- charger plusieurs dictionnaires externes en JSON ;
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
├─ README.md
├─ CHANGELOG.md
├─ index.html
├─ assets/
│  ├─ generateur.js
│  └─ style.css
└─ data/
   ├─ adjectifs.json
   ├─ epicenes.json
   ├─ exclusions.json
   ├─ metiers-inclusive.json
   ├─ pronoms.json
   └─ verbes-exclus.json
```

### `index.html`

Contient la structure HTML principale du générateur.

### `assets/style.css`

Contient l’apparence du générateur.

### `assets/generateur.js`

Contient la logique principale du générateur.

### `data/metiers-inclusive.json`

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

### `data/pronoms.json`

Contient les règles de conversion des pronoms.

### `data/adjectifs.json`

Contient des adjectifs irréguliers, des suffixes et des formes particulières.

### `data/epicenes.json`

Contient les mots épicènes à protéger.

### `data/exclusions.json`

Contient les mots à ne pas transformer.

### `data/verbes-exclus.json`

Contient les verbes à protéger pour éviter des accords incorrects.

### `CHANGELOG.md`

Contient l’historique des mises à jour du projet.

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

Les discussions et issues du dépôt peuvent servir à signaler les bugs, proposer des mots ou suggérer des améliorations.

---

## Historique des mises à jour

Le journal des modifications est disponible ici :

[Consulter le changelog](CHANGELOG.md)

---

## Statut actuel

Le générateur est fonctionnel, mais encore en amélioration.

---

## Note finale

Ce générateur est un outil communautaire.

Il est proposé gratuitement, dans une démarche d’accessibilité, d’entraide et d’amélioration progressive.

Une relecture humaine reste recommandée après génération.
