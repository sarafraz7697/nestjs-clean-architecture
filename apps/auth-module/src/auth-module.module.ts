import { Module } from '@nestjs/common';
import { AuthModuleController } from './auth-module.controller';
import { AuthModuleService } from './auth-module.service';
import { EnvConfigModule } from '@libs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { JwtModule } from '@nestjs/jwt';
import { AccessJwtConfig, AccessJwtStrategy } from './config';

@Module({
  imports: [
    EnvConfigModule,
    JwtModule.registerAsync({
      useClass: AccessJwtConfig,
      global: true,
    }),
    ClientsModule.register([
      {
        name: 'AUDIT_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'audit_queue',
        },
      },
    ]),
  ],
  controllers: [AuthModuleController],
  providers: [AuthModuleService, AccessJwtStrategy],
})
export class AuthModule {}
