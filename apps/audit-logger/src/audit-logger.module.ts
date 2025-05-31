import { Module } from '@nestjs/common';
import { AuditLoggerController } from './audit-logger.controller';
import { AuditLoggerService } from './audit-logger.service';
import { EnvConfigModule } from '@libs/config';

@Module({
  imports: [EnvConfigModule],
  controllers: [AuditLoggerController],
  providers: [AuditLoggerService],
})
export class AuditLoggerModule {}
