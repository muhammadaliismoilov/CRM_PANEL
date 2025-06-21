import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { StudentController } from './students.controller';
import { StudentService } from './students.service';
import { student } from './student.model';

@Module({
  imports: [SequelizeModule.forFeature([student])],
  controllers: [StudentController],
  providers: [StudentService],
})
export class StudentModule {}