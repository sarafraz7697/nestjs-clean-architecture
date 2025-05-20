import { EnvConfigService } from '@configs/env';
import { Inject, Injectable } from '@nestjs/common';
import {
  CACHE_SERVICE_TOKEN,
  DATA_SERVICE_TOKEN,
  ICacheService,
  IDataservice,
} from '@core/interfaces';

@Injectable()
export class UserUseCase {
  constructor(
    @Inject(DATA_SERVICE_TOKEN)
    private dataService: IDataservice,

    @Inject(CACHE_SERVICE_TOKEN)
    private cacheService: ICacheService,

    private envCofnig: EnvConfigService,
  ) {}

  // private logger = new Logger(UserUseCase.name);

  async findUserByMobile(mobile: string) {}
}
