
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { StudentsModule } from './students/students.module';
import { CoursesModule } from './courses/courses.module';
import { TeachersModule } from './teachers/teachers.module';
import { AdminModule } from './admins/admins.module';
import { CourseStudentModule } from './couses-student/couses-student.module';
import { PaymentModule } from './payment/payment.module';
import { AttendanceModule } from './attendance/attendance.module';
import { AuthModule } from './auth/auth.module';
import { ReportsModule } from './reports/reports.module';
import { TelegramModule } from './telegram/telegram.module';
import { ComplaintsModule } from './complaints/complaints.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        dialect: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: +(configService.get<number>('DB_PORT') ?? 5432),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        autoLoadModels: true,
        synchronize: true, // Faqat ishlab chiqishda
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    AdminModule,
    StudentsModule,
    TeachersModule,
    CoursesModule,
    CourseStudentModule,
    PaymentModule,
    AttendanceModule,
    ReportsModule,
    TelegramModule,
    ComplaintsModule,
  ],
})
export class AppModule {}