import { Module } from '@nestjs/common';
import { AuthModuleController } from './auth-module.controller';
import { AuthModuleService } from './auth-module.service';
import { EnvConfigModule } from '@libs/config';

@Module({
  imports: [EnvConfigModule],
  controllers: [AuthModuleController],
  providers: [AuthModuleService],
})
export class AuthModule {}
