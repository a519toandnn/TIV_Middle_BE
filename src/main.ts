import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { TransformInterceptor } from './common/interceptors/response.interceptor';
import { AllExceptionFilter } from './common/filter/all-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = new ConfigService();

  const logger = new Logger('bootstrap');

  app.useGlobalPipes(new ValidationPipe({
    whitelist : true,
    forbidNonWhitelisted: true,
    transform: true
  }));

  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalFilters(new AllExceptionFilter());

  await app.listen(configService.get<number>('PORT') ?? 3000);
  logger.log(`Application is running on: ${configService.get<string>('PORT')}`);
}
bootstrap();
