import { Module } from '@nestjs/common';
     import { JwtModule } from '@nestjs/jwt';
     import { PassportModule } from '@nestjs/passport';
     import { JwtStrategy } from './jwt.strategy';
     import { AuthService } from './auth.service';
     import { AuthController } from './auth.controller';
     import { ConfigModule, ConfigService } from '@nestjs/config';
     // import { RolesGuard } from './jwt-auth.guard';

     @Module({
       imports: [
         ConfigModule,
         PassportModule,
         JwtModule.registerAsync({
           imports: [ConfigModule],
           useFactory: async (configService: ConfigService) => ({
             secret: configService.get<string>('JWT_SECRET'),
             signOptions: { expiresIn: '60m' },
           }),
           inject: [ConfigService],
         }),
       ],
       controllers: [AuthController],
       providers: [JwtStrategy, AuthService], // RolesGuard removed due to missing export
       exports: [JwtModule, PassportModule, AuthService],
     })
     export class AuthModule {}