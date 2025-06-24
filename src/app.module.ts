// import { Module } from '@nestjs/common';
// import { ConfigModule, ConfigService } from '@nestjs/config';
// import { SequelizeModule } from '@nestjs/sequelize';
// import { StudentModule } from './students/students.module';
// import { CoursesModule } from './courses/courses.module';
// import { TeachersModule } from './teachers/teachers.module';
// import { AdminsModule } from './admins/admins.module';
// import { PaymentModule } from './payment/payment.module';
// import { AttendanceModule } from './attendance/attendance.module';
// import { CousesStudentModule } from './couses-student/couses-student.module';


// @Module({
//   imports: [
//     ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
//     SequelizeModule.forRootAsync({
//       imports: [ConfigModule],
//       useFactory: (configService: ConfigService) => ({
//         dialect: 'postgres',
//         host: configService.get<string>('DB_HOST'),
//         port: +(configService.get<number>('DB_PORT') ?? 5432),
//         username: configService.get<string>('DB_USERNAME'),
//         password: configService.get<string>('DB_PASSWORD'),
//         database: configService.get<string>('DB_DATABASE'),
//         autoLoadModels: true,
//         synchronize: true, 
//       }),
//       inject: [ConfigService],
//     }),
//     StudentModule,
//     CoursesModule,
//     TeachersModule,
//     AdminsModule,
//     PaymentModule,
//     AttendanceModule,
//     CousesStudentModule,
//   ],
// })
// export class AppModule {}

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { StudentsModule } from './students/students.module';
import { CoursesModule } from './courses/courses.module';
import { TeachersModule } from './teachers/teachers.module';
import { AdminModule } from './admins/admins.module';
import { PaymentModule } from './payment/payment.module';
import { AttendanceModule } from './attendance/attendance.module';
import { AuthModule } from './auth/auth.module';

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
    StudentsModule,
    CoursesModule,
    TeachersModule,
    AdminModule,
    PaymentModule,
    AttendanceModule,
   AdminModule
  ],
})
export class AppModule {}