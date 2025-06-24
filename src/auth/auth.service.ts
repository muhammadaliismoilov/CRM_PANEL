import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { admins } from '../admins/admins.model';
import { students } from '../students/student.model';
import { teachers } from '../teachers/teachers.model';
import * as bcrypt from 'bcrypt';
import { use } from 'passport';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async validateUser(login: string, password: string): Promise<any> {
    // Har bir modeldan foydalanuvchini izlash
    const admin = await admins.findOne({ where: { login } });
    const student = await students.findOne({ where: { login } });
    const teacher = await teachers.findOne({ where: { login } });
    const superadmin = await admins.findOne({ where:{login}})
    // Birinchi topilgan foydalanuvchini tanlash
    const user = admin || student || teacher || superadmin;
    
    if (!user) {
      throw new UnauthorizedException('User with this login not found');
    }

    // Password mavjudligini tekshirish
    if (!user.dataValues.password || typeof user.dataValues.password !== 'string') {
      throw new UnauthorizedException('Invalid user password data');
    }


    // Parol tekshiruvi
    const isPasswordValid = await bcrypt.compare(password, user.dataValues.password);
    
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    // Foydalanuvchi ma'lumotlarini qaytarish
    return { id: user.id, login: user.login, role: user.role };
  }

  async login(login: string, password: string) {
    const user = await this.validateUser(login, password);
    const payload = { id: user.id, login: user.login, role: user.role };

    // Access token (15 daqiqa)
    const accessToken = this.jwtService.sign(payload, { expiresIn: '15m' });
    // Refresh token (7 kun)
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });
    
    return {
      ...user,
      accessToken,
      refreshToken,
    };
  }

  async logout() {
    return { message: 'Successfully logged out' };
  }
}