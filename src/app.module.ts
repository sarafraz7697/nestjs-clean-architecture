import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EnvConfigModule } from '@configs/env';
import { HealthCheckModule } from 'health-check';
import { UserUseCaseModule } from '@use-cases/user/user.module';
import { LoggerModule } from '@configs/modules';
import { RateLimmitModule } from '@configs/modules';

@Module({
  imports: [
    EnvConfigModule,
    HealthCheckModule,
    LoggerModule,
    RateLimmitModule,
    UserUseCaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
