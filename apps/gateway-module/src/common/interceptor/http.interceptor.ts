import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';

import { Observable, map } from 'rxjs';
import { NODE_ENV } from '@constants/application.constant';
import { EnvConfigService } from '@libs/config';

export interface ApResponse<T> {
  data: T;
  statusCode?: number;
  message?: string;
}

@Injectable()
export class HttpInterceptor<T> implements NestInterceptor<T, ApResponse<T>> {
  constructor(private envConfigService: EnvConfigService) {}

  async intercept(
    _context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<ApResponse<T>>> {
    const nodeEnv = this.envConfigService.getNodeEnv();

    const getType = (value: unknown) => {
      const type = typeof value;

      return {
        type,
        size: Array.isArray(value) ? value.length : 0,
      };
    };

    return next.handle().pipe(
      map((data) => ({
        data: !data ? null : data,
        timestamp: Date.now(),
        info: nodeEnv === NODE_ENV.DEVELOPMENT ? getType(data) : undefined,
      })),
    );
  }
}
