import { NestFactory } from '@nestjs/core';
import { AuditLoggerModule } from './audit-logger.module';
import { EnvConfigService } from '@libs/config';

async function bootstrap() {
  const app = await NestFactory.create(AuditLoggerModule);
  const envService = app.get(EnvConfigService);
  const port = envService.getPort();

  console.info('Service Port', port);

  await app.listen(port, '0.0.0.0');
}
bootstrap();
