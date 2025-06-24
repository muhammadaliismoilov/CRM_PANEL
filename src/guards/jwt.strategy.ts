import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { InjectModel } from '@nestjs/sequelize';
import { admins } from '../admins/admins.model';
import { teachers } from '../teachers/teachers.model';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    @InjectModel(admins)
    private adminModel: typeof admins,
    @InjectModel(teachers)
    private teacherModel: typeof teachers,
  ) {
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET environment variable is not defined');
    }
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request) => request?.cookies?.accessToken,
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    let user: admins | teachers | null = null;

    // Admin modelida tekshirish
    user = await this.adminModel.findByPk(payload.sub);
    if (!user) {
      // Agar admin topilmasa, Teacher modelida tekshirish
      user = await this.teacherModel.findByPk(payload.sub);
    }

    if (!user) {
      throw new UnauthorizedException('Noto‘g‘ri token');
    }

    return { id: user.id, login: user.login, role: user.role };
  }
}