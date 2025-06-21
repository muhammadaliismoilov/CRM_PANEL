import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';
import { TeachersService } from './teachers.service';
import { TeachersController } from './teachers.controller';
import { teachers } from '../teachers/teachers.model';

@Module({
  imports: [
    SequelizeModule.forFeature([teachers]),
    JwtModule.register({
      secret: process.env.JWT_SECRET, 
      signOptions: { expiresIn: '15m' },
    }),
  ],
  providers: [TeachersService],
  controllers: [TeachersController],
})
export class TeachersModule {}