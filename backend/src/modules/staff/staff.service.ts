import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class StaffService {
  constructor(
    private usersService: UsersService,
  ) {}

  async getStaffStatistics(perimeterId?: string) {
    const users = await this.usersService.findAll();
    const filteredUsers = perimeterId
      ? users.filter((u) => u.perimeterId === perimeterId)
      : users;

    // Statistiques par fonction
    const byFunction = filteredUsers.reduce((acc, user) => {
      const func = user.profile?.function || 'Non défini';
      acc[func] = (acc[func] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Statistiques par RDC
    const byRDC = filteredUsers.reduce((acc, _user) => {
      // TODO: Implémenter la logique pour obtenir le RDC du user
      const rdc = 'Non défini';
      acc[rdc] = (acc[rdc] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      total: filteredUsers.length,
      byFunction,
      byRDC,
      users: filteredUsers,
    };
  }

  async getOrganigramme(perimeterId?: string) {
    const users = await this.usersService.findAll();
    const filteredUsers = perimeterId
      ? users.filter((u) => u.perimeterId === perimeterId)
      : users;

    // Grouper par fonction/rôle
    return filteredUsers.map((user) => ({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.profile?.phone,
      function: user.profile?.function,
      role: user.role,
      photo: user.profile?.photo,
    }));
  }
}
