# Guide des Rôles et Permissions

## Vue d'ensemble

Ce document décrit le système de rôles et permissions de l'application de gestion de chantiers BTP.

## Profils Utilisateurs

### 🔐 Administrateur (ADMIN)
**Rôle** : Configuration globale, gestion des droits

**Responsabilités** :
- Configuration complète de l'application
- Gestion des utilisateurs et des droits d'accès
- Administration des périmètres
- Accès à toutes les fonctionnalités

**Accès** :
- ✅ Tous les espaces
- ✅ Zone de configuration (admin)
- ✅ Gestion complète des utilisateurs

---

### 💼 CAFF (Chargé d'affaires)
**Rôle** : Suivi global des chantiers, reporting

**Responsabilités** :
- Suivi global de tous les chantiers
- Création et gestion des chantiers
- Génération de rapports
- Suivi des interventions
- Gestion des utilisateurs (création/modification)

**Accès** :
- ✅ Espace CAFF (dédié)
- ✅ Configuration (zone CAFF)
- ✅ Tableau de bord
- ✅ Chantiers (CRUD)
- ✅ Interventions (CRU)
- ✅ Rapports et exports

---

### 🏗️ RDC (Responsable de chantier)
**Rôle** : Gestion opérationnelle du chantier

**Responsabilités** :
- Gestion opérationnelle des chantiers assignés
- Création et suivi des interventions
- Gestion du matériel sur le chantier
- Validation des absences et feuilles de temps
- Coordination des équipes

**Accès** :
- ✅ Espace RDC (dédié)
- ✅ Chantiers (modification des chantiers assignés)
- ✅ Interventions (CRU)
- ✅ Matériel (gestion)
- ✅ Validation absences/feuilles de temps
- ✅ Planning (gestion)

---

### 📅 PRÉPA (Préparateur)
**Rôle** : Planification et organisation

**Responsabilités** :
- Planification des interventions
- Organisation du planning
- Préparation des interventions
- Gestion du matériel nécessaire

**Accès** :
- ✅ Planning (gestion complète)
- ✅ Interventions (CRU)
- ✅ Matériel (gestion)
- ✅ Tableau de bord

---

### 👷 CE (Chef d'équipe)
**Rôle** : Suivi matériel et interventions

**Responsabilités** :
- Suivi des interventions assignées
- Gestion du matériel de l'équipe
- Coordination sur le terrain

**Accès** :
- ✅ Interventions (modification des interventions assignées)
- ✅ Matériel (gestion)
- ✅ Tableau de bord
- ✅ Planning (consultation)

---

### 👥 RH (Ressources Humaines)
**Rôle** : Gestion des ressources humaines

**Responsabilités** :
- Gestion des utilisateurs et profils
- Validation des absences
- Validation des feuilles de temps
- Gestion du staff

**Accès** :
- ✅ Staff (gestion)
- ✅ Utilisateurs (CRU)
- ✅ Validation absences/feuilles de temps
- ✅ Profils utilisateurs

---

### 🔧 AUTRE (Autres profils spécifiques)
**Rôle** : Profils spécifiques (ex. sous-traitants)

**Responsabilités** :
- Consultation des informations nécessaires
- Accès limité selon les besoins

**Accès** :
- ✅ Tableau de bord (consultation)
- ✅ Chantiers (consultation)
- ✅ Interventions (consultation)
- ✅ Planning (consultation)
- ✅ Staff (consultation)

---

### 👤 EMPLOYEE (Employé/Ouvrier)
**Rôle** : Accès de base

**Responsabilités** :
- Consultation de son profil
- Gestion de ses absences
- Saisie de ses feuilles de temps

**Accès** :
- ✅ Mon Profil
- ✅ Absences (création/consultation)
- ✅ Feuilles de temps (création/consultation)

---

## Utilisation dans le code

### Frontend

```typescript
import { usePermissions } from '../hooks/usePermissions';
import PermissionGuard from '../components/PermissionGuard';

function MyComponent() {
  const { canCreate, canUpdate, canDelete } = usePermissions();

  return (
    <div>
      {canCreate('worksites') && (
        <button>Créer un chantier</button>
      )}
      
      <PermissionGuard resource="worksites" action="update">
        <button>Modifier</button>
      </PermissionGuard>
    </div>
  );
}
```

### Backend

```typescript
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { UserRole } from '../users/entities/user.entity';

@Controller('worksites')
@UseGuards(JwtAuthGuard, RolesGuard)
export class WorksitesController {
  @Post()
  @Roles(UserRole.ADMIN, UserRole.CAFF)
  create(@Body() dto: CreateWorksiteDto) {
    // ...
  }
}
```

---

## Matrice des permissions

Voir le fichier `docs/ROLES_AND_PERMISSIONS.md` pour la matrice complète des permissions.

---

## Sécurité

- Toutes les routes sont protégées par authentification JWT
- Les permissions sont vérifiées côté serveur et côté client
- Principe du moindre privilège appliqué
- Filtrage des données par périmètre (sauf ADMIN et CAFF)

