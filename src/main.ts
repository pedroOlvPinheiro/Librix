import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import chalk from 'chalk';
import { ValidationError } from 'class-validator';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

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

  const documentConfig = new DocumentBuilder()
    .setTitle('Librix API')
    .setDescription('Sistema de gerenciamento de biblioteca')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, documentConfig);
  SwaggerModule.setup('api', app, document);

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
