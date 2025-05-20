import { Inject, Injectable } from '@nestjs/common';
import { IDataservice } from '@core/interfaces/services/data-service.interfaces';

import * as IRepositories from '@core/interfaces/repositories';

@Injectable()
export class MongooseDataSerivce implements IDataservice {
  constructor(
    @Inject(IRepositories.USER_REPOSITORY_TOKEN)
    public readonly users: IRepositories.IUserRepository,
  ) {}
}
