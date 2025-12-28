# Instructions pour créer une sauvegarde GitHub

## ✅ Étape 1 : Créer un dépôt sur GitHub

1. Allez sur [GitHub.com](https://github.com) et connectez-vous
2. Cliquez sur le bouton **"+"** en haut à droite, puis sélectionnez **"New repository"**
3. Remplissez les informations :
   - **Repository name** : `application-gestion-chantiers-btp` (ou le nom de votre choix)
   - **Description** : "Application de gestion de chantiers BTP"
   - **Visibilité** : Choisissez **Private** (recommandé) ou **Public**
   - **NE COCHEZ PAS** "Initialize this repository with a README" (nous avons déjà un README)
4. Cliquez sur **"Create repository"**

## ✅ Étape 2 : Connecter votre dépôt local à GitHub

Une fois le dépôt créé, GitHub vous affichera des instructions. Utilisez les commandes suivantes dans votre terminal :

```bash
# Ajouter le remote GitHub (remplacez VOTRE_USERNAME et VOTRE_REPO par vos valeurs)
git remote add origin https://github.com/VOTRE_USERNAME/VOTRE_REPO.git

# Renommer la branche principale en 'main' (si nécessaire)
git branch -M main

# Pousser le code vers GitHub
git push -u origin main
```

## ✅ Étape 3 : Vérification

Après avoir poussé le code, vous devriez voir tous vos fichiers sur GitHub.

## 📝 Commandes Git utiles pour la suite

### Ajouter des modifications
```bash
git add .
git commit -m "Description des modifications"
git push
```

### Voir l'état du dépôt
```bash
git status
```

### Voir l'historique des commits
```bash
git log --oneline
```

## 🔐 Authentification GitHub

Si vous êtes invité à vous authentifier lors du `git push`, vous pouvez :

1. **Utiliser un Personal Access Token (recommandé)** :
   - Allez dans GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
   - Créez un nouveau token avec les permissions `repo`
   - Utilisez ce token comme mot de passe lors du push

2. **Utiliser GitHub CLI** :
   ```bash
   gh auth login
   ```

## ⚠️ Note importante

Le fichier `.gitignore` est déjà configuré pour exclure :
- Les fichiers de dépendances (`node_modules/`)
- Les fichiers de base de données (`*.sqlite`, `*.db`)
- Les fichiers de stockage (`storage/`, `uploads/`)
- Les fichiers d'environnement (`.env`)
- Les fichiers de build (`dist/`, `build/`)

Ces fichiers ne seront **pas** sauvegardés sur GitHub, ce qui est normal et souhaitable.



