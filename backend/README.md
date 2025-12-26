# Backend - API NestJS

## Configuration

### Fichier .env

Créez un fichier `.env` à la racine du dossier `backend/` en copiant `.env.example` :

```bash
cp .env.example .env
```

Ou sur Windows PowerShell :
```powershell
Copy-Item .env.example .env
```

### Variables d'environnement

- `NODE_ENV` : Environnement (development, production)
- `PORT` : Port du serveur (par défaut 3000)
- `DB_PATH` : Chemin vers le fichier SQLite (par défaut database.sqlite)
- `JWT_SECRET` : Secret pour signer les tokens JWT (changez-le en production !)
- `JWT_EXPIRES_IN` : Durée de validité des tokens (par défaut 7d)
- `STORAGE_PATH` : Chemin vers le dossier de stockage des fichiers

### Générer un secret JWT sécurisé

Pour générer un secret JWT sécurisé en production, vous pouvez utiliser :

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## Démarrage

```bash
# Installation des dépendances (depuis la racine du monorepo)
npm install

# Développement
npm run dev:backend

# Ou depuis le dossier backend
cd backend
npm run start:dev

# Production
npm run build
npm run start:prod
```

## Base de données

La base de données SQLite sera créée automatiquement au premier démarrage à l'emplacement spécifié dans `DB_PATH`.

## Stockage des fichiers

Le dossier `storage/` est créé automatiquement avec les sous-dossiers :
- `storage/documents/` : Documents divers
- `storage/photos/` : Photos
- `storage/signatures/` : Signatures électroniques

Ces dossiers sont ignorés par Git mais créés automatiquement par l'application.
