import { NestFactory } from '@nestjs/core';
import { EnvConfigService } from './configs/env/env.service';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { HttpExceptionFilter } from '@common/exceptions';

import { AppRoutingModule } from 'router.module';
import { staticAssetsConfig, swaggerConfig } from '@configs/modules';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppRoutingModule,
    new FastifyAdapter({ ignoreTrailingSlash: true }),
    { bufferLogs: true },
  );
  const envService = app.get(EnvConfigService);
  const port = envService.getPort();
  const version = envService.getVersion();

  const methods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']; // OR comma-delimited string 'GET,POST,PUT,PATH,DELETE'
  app.enableCors({
    origin: '*',
    methods,
  });

  app.useLogger(app.get(Logger));

  app.setGlobalPrefix(version);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  app.useGlobalFilters(new HttpExceptionFilter());

  app.enableShutdownHooks();

  // TODO SOCKET.io with Redis
  // const redisIoAdapter = new RedisIoAdapter(app, envService);
  // await redisIoAdapter.connectToRedis();
  // app.useWebSocketAdapter(redisIoAdapter);

  staticAssetsConfig(app);
  swaggerConfig(app);

  await app.listen(port, '0.0.0.0');
}
bootstrap();
