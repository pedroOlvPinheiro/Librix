import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { BooksModule } from './modules/books/books.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoanModule } from './modules/loan/loan.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { AllExceptionFilter } from './common/exception-filter/all-exception.filter';
import { AuthModule } from './modules/auth/auth.module';
import { AuthGuard } from './modules/auth/guard/auth.guard';
import { RoleGuard } from './common/guard/role.guard';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],

      useFactory: (configService: ConfigService) => ({
        type: configService.get<'postgres'>('DB_TYPE'),
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DATABASE'),
        autoLoadEntities: true,
      }),
    }),
    ScheduleModule.forRoot(),
    UsersModule,
    BooksModule,
    LoanModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter,
    },
  ],
})
export class AppModule {}
