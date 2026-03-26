import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
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

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const origin =
      exception instanceof HttpException
        ? ExceptionFilterErrorEnum.REQUEST_ERROR
        : ExceptionFilterErrorEnum.DATABASE_OR_INTERNAL_ERROR;

    const message =
      exception instanceof HttpException
        ? this.extractMessage(exception.getResponse())
        : 'Erro interno Inesperado';

    const errorResponse = {
      statusCode: status,
      timeStamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      origin,
      message,
    };

    this.handleLogging(exception, request, status);

    response.status(status).json(errorResponse);
  }

  private extractMessage(response: string | object): string {
    if (typeof response === 'object' && response != null) {
      return (response as any).message || JSON.stringify(response);
    }

    return response;
  }

  private handleLogging(exception: unknown, request: Request, status: number) {
    const { method, url, ip } = request;

    //Se for > 500, significa erro crítico interno
    if (status >= 500) {
      const stack =
        exception instanceof Error ? exception.stack : 'Sem Stack Trace';

      this.logger.error(
        `[${method}] ${url} - Status: ${status} - Error: ${JSON.stringify(exception)} - Ip: ${ip}`,
        stack,
      );
    } else {
      //erro do cliente
      this.logger.warn(
        `[${method}] ${url} - Status: ${status} - Message: ${JSON.stringify(exception)}`,
      );
    }
  }
}
