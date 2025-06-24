import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import cookieParser = require('cookie-parser');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));
  const configService = app.get(ConfigService);
  const config = new DocumentBuilder()
    .setTitle('CRM_panel API')
    .setDescription('CRM_panel boshqarish uchun API')
    .setVersion('1.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, // JWT avtorizatsiyasini aniqlash
      'defaultBearerAuth', // Bu nom Swagger’da "Authorize" uchun ishlatiladi
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);
  const port = configService.get('PORT') || 3000;
  await app.listen(port);
  console.log(`Server is running on port ${port}`);
}
bootstrap();