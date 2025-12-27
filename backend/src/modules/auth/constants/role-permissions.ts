import { UserRole } from '../../users/entities/user.entity';

/**
 * Définition des permissions par rôle pour le backend
 * Utilisé pour la validation côté serveur
 */

export interface RolePermission {
  resource: string;
  actions: string[];
}

export const BACKEND_ROLE_PERMISSIONS: Record<UserRole, RolePermission[]> = {
  [UserRole.ADMIN]: [
    { resource: 'users', actions: ['create', 'read', 'update', 'delete', 'manage'] },
    { resource: 'config', actions: ['read', 'update', 'delete'] },
    { resource: 'perimeters', actions: ['create', 'read', 'update', 'delete'] },
    { resource: 'worksites', actions: ['create', 'read', 'update', 'delete'] },
    { resource: 'interventions', actions: ['create', 'read', 'update', 'delete'] },
    { resource: 'materials', actions: ['create', 'read', 'update', 'delete'] },
    { resource: 'staff', actions: ['read', 'update'] },
    { resource: 'dashboard', actions: ['read'] },
    { resource: 'planning', actions: ['read', 'update'] },
    { resource: 'reports', actions: ['read', 'export'] },
  ],

  [UserRole.CAFF]: [
    { resource: 'worksites', actions: ['create', 'read', 'update', 'delete'] },
    { resource: 'interventions', actions: ['create', 'read', 'update'] },
    { resource: 'reports', actions: ['read', 'export'] },
    { resource: 'dashboard', actions: ['read'] },
    { resource: 'staff', actions: ['read'] },
    { resource: 'users', actions: ['create', 'read', 'update'] },
    { resource: 'config', actions: ['read', 'update'] },
    { resource: 'perimeters', actions: ['read', 'update'] },
    { resource: 'planning', actions: ['read'] },
  ],

  [UserRole.RDC]: [
    { resource: 'worksites', actions: ['read', 'update'] },
    { resource: 'interventions', actions: ['create', 'read', 'update'] },
    { resource: 'materials', actions: ['read', 'update'] },
    { resource: 'staff', actions: ['read'] },
    { resource: 'absences', actions: ['read', 'validate'] },
    { resource: 'timesheets', actions: ['read', 'validate'] },
    { resource: 'dashboard', actions: ['read'] },
    { resource: 'planning', actions: ['read', 'update'] },
  ],

  [UserRole.PREPA]: [
    { resource: 'planning', actions: ['create', 'read', 'update', 'delete'] },
    { resource: 'interventions', actions: ['create', 'read', 'update'] },
    { resource: 'worksites', actions: ['read'] },
    { resource: 'materials', actions: ['read', 'update'] },
    { resource: 'staff', actions: ['read'] },
    { resource: 'dashboard', actions: ['read'] },
  ],

  [UserRole.CE]: [
    { resource: 'interventions', actions: ['read', 'update'] },
    { resource: 'materials', actions: ['read', 'update'] },
    { resource: 'worksites', actions: ['read'] },
    { resource: 'dashboard', actions: ['read'] },
    { resource: 'planning', actions: ['read'] },
  ],

  [UserRole.RH]: [
    { resource: 'users', actions: ['create', 'read', 'update'] },
    { resource: 'staff', actions: ['read', 'update'] },
    { resource: 'absences', actions: ['read', 'validate'] },
    { resource: 'timesheets', actions: ['read', 'validate'] },
    { resource: 'profiles', actions: ['read', 'update'] },
    { resource: 'dashboard', actions: ['read'] },
  ],

  [UserRole.OTHER]: [
    { resource: 'dashboard', actions: ['read'] },
    { resource: 'worksites', actions: ['read'] },
    { resource: 'interventions', actions: ['read'] },
    { resource: 'planning', actions: ['read'] },
    { resource: 'staff', actions: ['read'] },
  ],

  [UserRole.EMPLOYEE]: [
    { resource: 'profile', actions: ['read', 'update'] },
    { resource: 'absences', actions: ['create', 'read'] },
    { resource: 'timesheets', actions: ['create', 'read'] },
  ],
};

/**
 * Vérifie si un rôle a une permission spécifique
 */
export function hasRolePermission(
  role: UserRole,
  resource: string,
  action: string,
): boolean {
  const permissions = BACKEND_ROLE_PERMISSIONS[role] || [];
  const resourcePermission = permissions.find((p) => p.resource === resource);

  if (!resourcePermission) {
    return false;
  }

  return (
    resourcePermission.actions.includes(action) ||
    resourcePermission.actions.includes('manage')
  );
}


