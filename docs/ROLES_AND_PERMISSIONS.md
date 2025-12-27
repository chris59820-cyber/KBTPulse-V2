# Rôles et Permissions - Application de Gestion de Chantiers BTP

## Vue d'ensemble des profils utilisateurs

### 1. Administrateur (ADMIN)
**Description** : Configuration globale, gestion des droits.

**Permissions** :
- ✅ Gestion complète des utilisateurs (création, modification, suppression)
- ✅ Configuration globale de l'application
- ✅ Gestion des périmètres
- ✅ Accès à tous les chantiers et interventions
- ✅ Gestion du matériel
- ✅ Accès au tableau de bord
- ✅ Gestion du planning
- ✅ Génération de rapports

**Accès aux espaces** :
- Configuration (zone admin)
- Tableau de bord
- Gestion des utilisateurs
- Tous les autres espaces en lecture/écriture

---

### 2. CAFF (Chargé d'affaires)
**Description** : Suivi global des chantiers, reporting.

**Permissions** :
- ✅ Création et gestion des chantiers
- ✅ Création et suivi des interventions
- ✅ Génération de rapports et exports
- ✅ Accès au tableau de bord global
- ✅ Consultation du staff
- ✅ Création et modification d'utilisateurs
- ✅ Configuration (zone CAFF)
- ✅ Gestion des périmètres (lecture/modification)
- ✅ Consultation du planning

**Accès aux espaces** :
- Espace CAFF (dédié)
- Configuration (zone CAFF)
- Tableau de bord
- Chantiers (création, modification, clôture)
- Interventions
- Staff (consultation)
- Planning (consultation)

---

### 3. RDC (Responsable de chantier)
**Description** : Gestion opérationnelle du chantier.

**Permissions** :
- ✅ Consultation et modification des chantiers assignés
- ✅ Création et gestion des interventions
- ✅ Gestion du matériel (lecture/modification)
- ✅ Consultation du staff
- ✅ Validation des absences
- ✅ Validation des feuilles de temps
- ✅ Accès au tableau de bord
- ✅ Gestion du planning (lecture/modification)

**Accès aux espaces** :
- Espace RDC (dédié)
- Tableau de bord
- Chantiers (modification des chantiers assignés)
- Interventions (création, modification)
- Matériel (gestion)
- Staff (consultation)
- Planning (gestion)

---

### 4. PRÉPA (Préparateur)
**Description** : Planification et organisation.

**Permissions** :
- ✅ Gestion complète du planning (création, modification, suppression)
- ✅ Création et modification des interventions
- ✅ Consultation des chantiers
- ✅ Gestion du matériel (lecture/modification)
- ✅ Consultation du staff
- ✅ Accès au tableau de bord

**Accès aux espaces** :
- Tableau de bord
- Planning (gestion complète)
- Interventions (création, modification)
- Chantiers (consultation)
- Matériel (gestion)
- Staff (consultation)

---

### 5. CE (Chef d'équipe)
**Description** : Suivi matériel et interventions.

**Permissions** :
- ✅ Consultation et modification des interventions assignées
- ✅ Gestion du matériel (lecture/modification)
- ✅ Consultation des chantiers
- ✅ Accès au tableau de bord
- ✅ Consultation du planning

**Accès aux espaces** :
- Tableau de bord
- Interventions (modification des interventions assignées)
- Matériel (gestion)
- Chantiers (consultation)
- Planning (consultation)

---

### 6. RH (Ressources Humaines)
**Description** : Gestion des ressources humaines.

**Permissions** :
- ✅ Création et modification des utilisateurs
- ✅ Consultation et modification du staff
- ✅ Validation des absences
- ✅ Validation des feuilles de temps
- ✅ Gestion des profils utilisateurs
- ✅ Accès au tableau de bord

**Accès aux espaces** :
- Tableau de bord
- Staff (gestion)
- Gestion des informations ouvriers
- Profils utilisateurs

---

### 7. AUTRE (Autres profils spécifiques)
**Description** : Profils spécifiques (ex. sous-traitants).

**Permissions** :
- ✅ Consultation du tableau de bord
- ✅ Consultation des chantiers
- ✅ Consultation des interventions
- ✅ Consultation du planning
- ✅ Consultation du staff

**Accès aux espaces** :
- Tableau de bord
- Chantiers (consultation)
- Interventions (consultation)
- Planning (consultation)
- Staff (consultation)

---

### 8. EMPLOYEE (Employé/Ouvrier)
**Description** : Accès de base pour les employés.

**Permissions** :
- ✅ Consultation et modification de son propre profil
- ✅ Création et consultation de ses absences
- ✅ Création et consultation de ses feuilles de temps

**Accès aux espaces** :
- Page d'accueil
- Mon Profil

---

## Matrice des permissions

| Ressource | ADMIN | CAFF | RDC | PRÉPA | CE | RH | AUTRE | EMPLOYEE |
|-----------|-------|------|-----|-------|----|----|----|----------|
| **Utilisateurs** | CRUD | CRU | - | - | - | CRU | - | - |
| **Configuration** | CRUD | RU | - | - | - | - | - | - |
| **Périmètres** | CRUD | RU | - | - | - | - | - | - |
| **Chantiers** | CRUD | CRUD | RU | R | R | - | R | - |
| **Interventions** | CRUD | CRU | CRU | CRU | RU | - | R | - |
| **Matériel** | CRUD | - | RU | RU | RU | - | - | - |
| **Staff** | RU | R | R | R | - | RU | R | - |
| **Tableau de bord** | R | R | R | R | R | R | R | - |
| **Planning** | RU | R | RU | CRUD | R | - | R | - |
| **Rapports** | RE | RE | - | - | - | - | - | - |
| **Absences** | - | - | V | - | - | V | - | CR |
| **Feuilles de temps** | - | - | V | - | - | V | - | CR |
| **Profil** | - | - | - | - | - | RU | - | RU |

**Légende** :
- **C** = Create (Créer)
- **R** = Read (Lire)
- **U** = Update (Modifier)
- **D** = Delete (Supprimer)
- **V** = Validate (Valider)
- **E** = Export (Exporter)

---

## Règles de sécurité

1. **Principe du moindre privilège** : Chaque utilisateur n'a accès qu'aux fonctionnalités nécessaires à son rôle.

2. **Filtrage par périmètre** : Les utilisateurs ne voient que les données de leur périmètre assigné (sauf ADMIN et CAFF).

3. **Validation hiérarchique** : Les absences et feuilles de temps nécessitent une validation par RDC, CAFF ou RH.

4. **Audit trail** : Toutes les actions importantes sont tracées avec l'identité de l'utilisateur.

5. **Protection des données sensibles** : Les informations RH ne sont accessibles qu'aux profils autorisés (RH, ADMIN, CAFF).

---

## Implémentation technique

### Backend
- Guards de rôles (`RolesGuard`) pour protéger les endpoints
- Décorateur `@Roles()` pour spécifier les rôles autorisés
- Filtrage des données selon le périmètre de l'utilisateur

### Frontend
- Composant `ProtectedRoute` pour protéger les routes
- Hook `useAuth` avec méthode `hasRole()` pour vérifier les permissions
- Navigation adaptative selon les rôles
- Masquage des boutons/actions non autorisées

---

## Évolution future

- Système de permissions granulaires par ressource
- Gestion des permissions personnalisées
- Délégation de permissions temporaires
- Groupes d'utilisateurs avec permissions partagées


