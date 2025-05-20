import { IUser } from '@core/entities';
import { IBaseRepository } from './base.repository';

export const USER_REPOSITORY_TOKEN = Symbol('USER_REPOSITORY_TOKEN');
export interface IUserRepository extends IBaseRepository<IUser> {
  findWithMobile(mobile: string): Promise<IUser | null>;
}
