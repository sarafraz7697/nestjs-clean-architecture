import * as IMongoDbRepositories from '@interfaces/repositories/mongodb';

export const MONGOOSE_DATA_SERVICE_TOKEN = Symbol(
  'MONGOOSE_DATA_SERVICE_TOKEN',
);

export interface IMongooseDataservice {
  accounts: IMongoDbRepositories.IAuditLoginRepository;
}
