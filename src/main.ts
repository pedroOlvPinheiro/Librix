import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import chalk from 'chalk';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log'],
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  await app.listen(process.env.PORT ?? 3000);

  const server = app.getHttpServer();
  const address = server.address();
  console.log(
    chalk.green(
      `Servidor preparado e rodando em: http://localhost:${address.port}`,
    ),
  );
}
bootstrap();
