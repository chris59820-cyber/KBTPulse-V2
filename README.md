# Application de Gestion de Chantiers BTP

Application web et mobile pour la gestion de chantiers de construction, centralisation des informations et optimisation des processus.

## 🚀 Fonctionnalités principales

### Gestion des utilisateurs
- Authentification sécurisée avec JWT
- Gestion des profils utilisateurs (Administrateur, CAFF, RDC, PREPA, CE, RH, Autre)
- Upload de photos de profil
- Gestion des permissions et droits d'accès

### Gestion des périmètres
- Configuration des périmètres avec adresses détaillées
- Horaires de travail par jour de la semaine
- Plage d'accueil configurable
- Coordonnées GPS avec sélection sur carte interactive

### Gestion des sites
- Création et modification des sites
- Structure organisationnelle (Secteur, Unité, Bâtiment, Étage, Équipement)
- Équipements spécifiques requis
- Documents et formations nécessaires

### Gestion des interventions
- Création et suivi des interventions
- Planification des équipes et matériels
- Suivi en temps réel
- Documents d'intervention
- Communication interne

### Tableau de bord
- Statistiques du personnel
- Statistiques des chantiers et interventions
- Indicateurs clés de performance (KPI)
- Organigramme interactif

### Planning
- Vue calendrier (jour, semaine, mois)
- Drag & Drop pour la planification
- Gestion des conflits de ressources
- Export et impression

### Profil utilisateur
- Informations personnelles et professionnelles
- Gestion des congés
- Suivi des heures de travail
- Documents et autorisations
- Matériel assigné

## 🛠️ Technologies

### Backend
- **Framework**: NestJS
- **Langage**: TypeScript
- **Base de données**: SQLite
- **ORM**: TypeORM
- **Authentification**: JWT avec Passport

### Frontend
- **Framework**: React
- **Langage**: TypeScript
- **Build tool**: Vite
- **Routing**: React Router DOM
- **State management**: TanStack Query
- **Cartes**: Leaflet / React-Leaflet
- **Graphiques**: Recharts

## 📦 Installation

### Prérequis
- Node.js (v18 ou supérieur)
- npm ou yarn

### Backend

```bash
cd backend
npm install
npm run dev
```

Le serveur backend démarre sur `http://localhost:3000`

### Frontend

```bash
cd frontend
npm install
npm run dev
```

L'application frontend démarre sur `http://localhost:3001`

## 🔐 Configuration

### Variables d'environnement

Créez un fichier `.env` dans le dossier `backend` :

```env
PORT=3000
JWT_SECRET=your-secret-key
STORAGE_PATH=./storage
```

## 📁 Structure du projet

```
.
├── backend/          # Application NestJS
│   ├── src/
│   │   ├── modules/  # Modules de l'application
│   │   ├── common/   # Utilitaires communs
│   │   └── main.ts   # Point d'entrée
│   └── package.json
├── frontend/         # Application React
│   ├── src/
│   │   ├── components/  # Composants React
│   │   ├── pages/      # Pages de l'application
│   │   ├── services/   # Services API
│   │   └── contexts/   # Contextes React
│   └── package.json
└── README.md
```

## 🗄️ Base de données

La base de données SQLite est créée automatiquement au premier démarrage. Les migrations sont gérées via TypeORM.

## 📝 Scripts disponibles

### Backend
- `npm run dev` - Démarre le serveur en mode développement
- `npm run build` - Compile le projet
- `npm run start:prod` - Démarre en mode production

### Frontend
- `npm run dev` - Démarre le serveur de développement
- `npm run build` - Compile pour la production
- `npm run preview` - Prévisualise la build de production

## 🔄 Sauvegarde GitHub

Pour créer une sauvegarde sur GitHub :

1. Créez un nouveau dépôt sur GitHub
2. Ajoutez le remote :
   ```bash
   git remote add origin https://github.com/votre-username/votre-repo.git
   ```
3. Poussez le code :
   ```bash
   git branch -M main
   git push -u origin main
   ```

## 📄 Licence

Ce projet est privé et confidentiel.

## 👥 Auteur

Application développée pour la gestion de chantiers BTP.
