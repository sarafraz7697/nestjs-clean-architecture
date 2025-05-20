import { DataServiceModule } from '@freamworks/data-service';
import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';

@Module({
  imports: [TerminusModule, DataServiceModule],
  // controllers: [HealthCheckController],
})
export class HealthCheckModule {}
