import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Complaint } from './complaints.model';
import { ComplaintsService } from './complaints.service';

@Module({
  imports: [SequelizeModule.forFeature([Complaint])],
  providers: [ComplaintsService],
  exports: [ComplaintsService],
})
export class ComplaintsModule {}
