import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ExceptionFilterErrorEnum } from 'src/utils/enum/exception-filter-error.enum';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const request = context.getRequest<Request>();
    const response = context.getResponse<Response>();

    let status: number;
    let origin: ExceptionFilterErrorEnum;
    let message: string;

    if (exception instanceof HttpException) {
      const messageResponse = exception.getResponse();

      status = exception.getStatus();
      origin = ExceptionFilterErrorEnum.REQUEST_ERROR;
      message =
        typeof messageResponse === 'object'
          ? (messageResponse as any).message
          : messageResponse;
    } else {
      status = 500;
      origin = ExceptionFilterErrorEnum.DATABASE_OR_INTERNAL_ERROR;
      message = 'Erro interno inesperado';
    }

    response.status(status).json({
      status,
      timeStamp: new Date().toISOString(),
      path: request.url,
      origin,
      message,
    });

    this.logger.error(exception);
  }
}
