import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AdminService } from './admins.service';
import { AdminController } from './admins.controller';
import { admins } from './admins.model';

@Module({
  imports: [SequelizeModule.forFeature([admins])],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}