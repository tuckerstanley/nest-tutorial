import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { logger } from './logger.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(logger); //binding the middleware to all routes
  await app.listen(3000);
}
bootstrap();
