import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth-module.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AuthModule, {
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'auth_queue',
    },
  });

  await app.listen();
}
bootstrap();
