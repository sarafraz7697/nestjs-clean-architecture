import * as IRepositories from '@core/interfaces/repositories';

export const DATA_SERVICE_TOKEN = Symbol('DATA_SERVICE_TOKEN');

export interface IDataservice {
  users: IRepositories.IUserRepository;
}
