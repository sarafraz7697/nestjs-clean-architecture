import { Module } from '@nestjs/common';
import { LoggerModule as PinoLoggerModule } from 'nestjs-pino';
import { NODE_ENV } from '@constants/application.constant';
import { EnvConfigModule, EnvConfigService } from '@libs/config/env';

@Module({
  imports: [
    PinoLoggerModule.forRootAsync({
      imports: [EnvConfigModule],
      inject: [EnvConfigService],
      useFactory: async (config: EnvConfigService) => {
        const isProduction = config.getNodeEnv() === NODE_ENV.PRODUCTION;
        return {
          pinoHttp: {
            level: isProduction ? 'warn' : 'debug',
            autoLogging: false,
            transport: !isProduction
              ? {
                  target: 'pino-pretty',
                  options: { colorize: true },
                }
              : undefined,
          },
        };
      },
    }),
  ],
  exports: [PinoLoggerModule],
})
export class LoggerModule {}
