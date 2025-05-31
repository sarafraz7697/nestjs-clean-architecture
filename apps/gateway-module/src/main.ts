import { NestFactory } from '@nestjs/core';
import { EnvConfigService } from '@libs/config';
import { GatewayModule } from './gateway-module.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { Logger } from 'nestjs-pino';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { HttpExceptionFilter } from './common/exceptions';
import { swaggerConfig } from './config';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    GatewayModule,
    new FastifyAdapter({ ignoreTrailingSlash: true }),
    { bufferLogs: true },
  );
  const envService = app.get(EnvConfigService);
  const port = envService.getPort();

  const methods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];
  app.enableCors({
    origin: '*',
    methods,
  });

  app.useLogger(app.get(Logger));

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalFilters(new HttpExceptionFilter());

  console.info('Service Port', port);

  app.enableShutdownHooks();
  swaggerConfig(app);

  await app.listen(port, '0.0.0.0');
}
bootstrap();
