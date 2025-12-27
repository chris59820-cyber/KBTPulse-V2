# Guide d'installation - Application de Gestion de Chantiers BTP

## Prérequis

- Node.js >= 18.0.0
- npm >= 9.0.0 (ou yarn/pnpm)
- SQLite (inclus dans Node.js)

## Installation

1. **Cloner le dépôt** (si applicable) ou se placer dans le dossier du projet

2. **Installer les dépendances**

```bash
npm install
```

Cela installera les dépendances pour tous les workspaces (backend, frontend, mobile, shared).

3. **Configuration de l'environnement**

Créer un fichier `.env` à la racine du backend :

```bash
cd backend
cp .env.example .env
```

Éditer le fichier `.env` et configurer les variables :

```env
NODE_ENV=development
PORT=3000
DB_PATH=database.sqlite
JWT_SECRET=votre-cle-secrete-changez-en-production
JWT_EXPIRES_IN=7d
STORAGE_PATH=./storage
```

4. **Créer le dossier storage**

```bash
mkdir -p backend/storage/documents backend/storage/photos backend/storage/signatures
```

## Développement

### Backend

```bash
# Depuis la racine du projet
npm run dev:backend

# Ou depuis le dossier backend
cd backend
npm run start:dev
```

Le backend sera accessible sur `http://localhost:3000`

### Frontend

```bash
# Depuis la racine du projet
npm run dev:frontend

# Ou depuis le dossier frontend
cd frontend
npm run dev
```

Le frontend sera accessible sur `http://localhost:3001`

### Mobile

```bash
# Depuis la racine du projet
npm run dev:mobile

# Ou depuis le dossier mobile
cd mobile
npm start
```

## Build

### Build complet

```bash
npm run build
```

### Build individuel

```bash
# Backend
npm run build:backend

# Frontend
npm run build:frontend

# Mobile
npm run build:mobile
```

## Structure du projet

```
.
├── backend/          # API NestJS
│   ├── src/
│   │   ├── modules/  # Modules fonctionnels
│   │   ├── common/   # Utilitaires partagés
│   │   └── main.ts   # Point d'entrée
│   └── package.json
├── frontend/         # Application React web
│   ├── src/
│   └── package.json
├── mobile/           # Application React Native
│   ├── src/
│   └── package.json
├── shared/           # Types et utilitaires partagés
│   ├── src/
│   └── package.json
└── package.json      # Configuration monorepo
```

## Base de données

La base de données SQLite est créée automatiquement au premier démarrage du backend.

Le fichier de base de données sera créé à l'emplacement spécifié dans `DB_PATH` (par défaut `backend/database.sqlite`).

## API

L'API est accessible sur `http://localhost:3000/api`

### Authentification

Toutes les routes (sauf `/api/auth/login` et `/api/auth/register`) nécessitent un token JWT dans le header :

```
Authorization: Bearer <token>
```

## Prochaines étapes

1. Créer un utilisateur administrateur via `/api/auth/register`
2. Configurer les périmètres via `/api/perimeters`
3. Créer les sites et chantiers
4. Commencer à utiliser l'application

## Support

Pour toute question ou problème, consulter la documentation technique ou contacter l'équipe de développement.

