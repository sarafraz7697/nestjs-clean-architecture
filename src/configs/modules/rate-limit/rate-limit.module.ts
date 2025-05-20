import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { RateLimitConfig } from './rate-limit.config';

@Module({
  imports: [
    ThrottlerModule.forRootAsync({
      useClass: RateLimitConfig,
    }),
  ],

  exports: [ThrottlerModule],
})
export class RateLimmitModule {}
