import { Module } from '@nestjs/common';
import { GatewayModuleController } from './gateway-module.controller';

import { EnvConfigModule, LoggerModule } from '@libs/config';
import { AuthModule } from './data-services/auth';

@Module({
  imports: [LoggerModule, EnvConfigModule, AuthModule],
  controllers: [GatewayModuleController],
  providers: [],
})
export class GatewayModule {}
