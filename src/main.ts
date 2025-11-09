import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = new ConfigService();

  const logger = new Logger('bootstrap');

  await app.listen(configService.get<number>('PORT') ?? 3000);
  logger.log(`Application is running on: ${configService.get<string>('PORT')}`);
}
bootstrap();
