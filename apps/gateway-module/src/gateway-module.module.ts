import { Module } from '@nestjs/common';
import { GatewayModuleController } from './gateway-module.controller';
import { GatewayModuleService } from './gateway-module.service';

import { ClientsModule, Transport } from '@nestjs/microservices';
import { EnvConfigModule, LoggerModule } from '@libs/config';
import { AuthModule } from './data-services/auth';

@Module({
  imports: [
    LoggerModule,
    EnvConfigModule,

    AuthModule,
    // ClientsModule.register([
    //   {
    //     name: 'AUTH_SERVICE',
    //     transport: Transport.RMQ,
    //     options: {
    //       urls: ['amqp://localhost:5672'],
    //       queue: 'auth_queue',
    //     },
    //   },
    // ]),
  ],
  controllers: [GatewayModuleController],
  providers: [GatewayModuleService],
})
export class GatewayModule {}
