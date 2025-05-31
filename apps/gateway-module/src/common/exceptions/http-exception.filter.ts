import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private logger = new Logger(HttpExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = exception.getStatus();

    if (typeof exception.getResponse() === 'object') {
      this.logger.error({ error: { ...(exception.getResponse() as any) } });

      response.status(status).send({
        ...(exception.getResponse() as any),
        timestamp: Date.now(),
        path: request.url,
        //data: null,
      });
    }

    response.status(status).send({
      statusCode: status,
      timestamp: Date.now(),
      path: request.url,
      message: exception.message,
    });
  }
}
