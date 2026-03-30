import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import chalk from 'chalk';
import { ValidationError } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn'],
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      exceptionFactory: (errors: ValidationError[]) => {
        const cleanedMessages = errors.flatMap((error) =>
          error.constraints ? Object.values(error.constraints) : [],
        );
        return new BadRequestException(cleanedMessages);
      },
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
