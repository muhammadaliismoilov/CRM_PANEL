import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtStrategy } from './jwt.strategy';
import { Role } from '../admins/admins.model'; // Role enum admins.model.ts dan olinadi

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<Role>('roles', context.getHandler());
    if (!requiredRoles) {
      return true; // Agar rollar talab qilinmasa, ruxsat beriladi
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    
    if (!user || !user.role) {
      return false; // Foydalanuvchi yoki roli mavjud emas
    }

    return requiredRoles.includes(user?.role); // Foydalanuvchi roli talab qilingan rollar ro‘yxatida bor yoki yo‘qligini tekshiradi
  }
}