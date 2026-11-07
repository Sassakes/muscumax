# Muscumax · ROUND

Carnet de musculation personnel en français, pensé pour le MMA et l’iPhone.

## Déployer sur Vercel

Importez `Sassakes/muscumax` dans Vercel, branche `main`.

- Framework : **Vite**
- Installation : `npm ci`
- Build : `npm run build`
- Dossier de sortie : `dist`
- Aucune variable d’environnement ni base de données requise.

## En local

Node.js 22.18+ :

```sh
npm ci
npm run dev
```

Vérification : `npm run build`.

## Fonctions

- Séance A : haut du corps, bench en priorité, finition bras.
- Séance B : jambes et rappel biceps/triceps.
- Séance C : full body léger facultatif.
- Saisie charge/reps par série, validation explicite et marge en réserve.
- Reprise de séance, repos avec minuteur, séances partielles, notes et historique.
- Courbe des charges, mode fatigue MMA, export/import JSON validé.
- Installation iPhone : Safari → Partager → Sur l’écran d’accueil.
- Cache hors connexion après un premier chargement complet sur HTTPS.

Les données restent sur l’appareil (`localStorage`). Elles ne sont pas synchronisées et peuvent être effacées avec les données du navigateur. Exporter régulièrement une sauvegarde. Installer l’app avant la première séance : son stockage peut différer de Safari.

Programme de départ à ajuster à la récupération et aux entraînements de MMA. Aucun poids de travail imposé.

## Structure

`src/program.ts` : séances et exercices. `src/model.ts` : données et validation des sauvegardes. `src/App.tsx` : interface. `scripts/create-service-worker.mjs` : génération du cache hors connexion.
