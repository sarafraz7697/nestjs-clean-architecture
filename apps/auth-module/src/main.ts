import { NestFactory } from '@nestjs/core';
import { EnvConfigService } from '@libs/config';
import { AuthModule } from './auth-module.module';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  const envService = app.get(EnvConfigService);
  const port = envService.getPort();

  console.info('Service Port', port);

  await app.listen(port, '0.0.0.0');
}
bootstrap();
