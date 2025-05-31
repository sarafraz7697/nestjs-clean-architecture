import { Inject, Injectable } from '@nestjs/common';
import * as IRepositories from '@interfaces/repositories/mongodb';
import { IMongooseDataservice } from '@interfaces/data-services/mongodb';

@Injectable()
export class MongooseDataSerivce implements IMongooseDataservice {
  constructor(
    @Inject(IRepositories.AUDIT_LOGIN_REPOSITORY_TOKEN)
    public readonly accounts: IRepositories.IAuditLoginRepository,
  ) {}
}
