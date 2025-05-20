import { Module } from '@nestjs/common';
import { LoggerModule as PinoLoggerModule } from 'nestjs-pino';
import { EnvConfigModule } from '@configs/env/env.module';
import { EnvConfigService } from '@configs/env/env.service';
import { NODE_ENV } from '@constants/application.constant';

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
            transport: isProduction
              ? undefined
              : {
                  target: 'pino-pretty',
                  options: { colorize: true },
                },
          },
        };
      },
    }),
  ],
  exports: [PinoLoggerModule],
})
export class LoggerModule {}
