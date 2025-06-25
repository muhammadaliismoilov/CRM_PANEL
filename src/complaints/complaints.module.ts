import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Complaint } from './complaints.model';
import { ComplaintsService } from './complaints.service';
import { ComplaintsController } from './complaints.controller';

@Module({
  imports: [SequelizeModule.forFeature([Complaint])],
  providers: [ComplaintsService,],
  controllers:[ComplaintsController],
  exports: [ComplaintsService],
})
export class ComplaintsModule {}
