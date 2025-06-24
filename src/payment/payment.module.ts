import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { payments } from './payment.model';
import { students } from '../students/student.model';
import { courses } from '../courses/courses.model';
import { teachers } from '../teachers/teachers.model';

@Module({
  imports: [SequelizeModule.forFeature([payments, students, courses, teachers])],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}