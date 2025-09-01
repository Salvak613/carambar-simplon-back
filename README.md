# Carambar Backend (Express + TypeScript + Sequelize + SQLite)

API de blagues Carambar, documentée avec Swagger UI.

## Prérequis

- Node.js 18+ et npm

## Installation

```bash
npm install
```

## Configuration (.env)

Copiez `.env.example` en `.env` puis ajustez si besoin :

```
PORT=your port
CORS_ORIGIN=your adress
DB_PATH=your db path
```

## Données d'exemple (reset)

Cette commande recrée le schéma et insère des blagues de test.

```bash
npm run seed
```

## Démarrer en dev

```bash
npm run dev
```

- Serveur: http://localhost:${PORT} (par défaut 3000)
- Santé: `GET /`
- Docs API (Swagger UI): `GET /api-docs`

## Build & prod

```bash
npm run build
npm start
```

## Endpoints principaux

- `GET /api/blagues` — liste des blagues
- `GET /api/blagues/random` — une blague aléatoire
- `GET /api/blagues/:id` — une blague par id
- `POST /api/blagues` — crée une blague

  - body JSON minimal :
    ```json
    { "question": "…", "reponse": "…" }
    ```

- SWAGGER : /api-docs/

## Structure

- `src/server.ts` — bootstrap serveur
- `src/app.ts` — app Express, CORS, Swagger
- `src/config/database.ts` — Sequelize (SQLite)
- `src/models/Blague.ts` — modèle (sans timestamps)
- `src/routes/blagueRoutes.ts` — routes `/api/blagues`
- `src/data/seed.ts` — script de seed
- `src/config/swagger.ts` — spec OpenAPI

## Notes

- CORS autorise l'origine `CORS_ORIGIN`.
- Aléatoire via `ORDER BY RANDOM()` (SQLite).
- Champs `createdAt/updatedAt` désactivés.
