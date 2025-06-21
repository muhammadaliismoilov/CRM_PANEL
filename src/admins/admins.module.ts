import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';
import { AdminsService } from './admins.service';
import { AdminsController } from './admins.controller';
import { admins } from './admins.model';

@Module({
  imports: [
    SequelizeModule.forFeature([admins]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '15m' },
    }),
  ],
  providers: [AdminsService],
  controllers: [AdminsController],
})
export class AdminsModule {}