import { IBaseRepository } from './base.repository';
import { IAuditLogin } from '@entities/mongodb/audit-login.entity';

export const AUDIT_LOGIN_REPOSITORY_TOKEN = Symbol(
  'AUDIT_LOGIN_REPOSITORY_TOKEN',
);
export interface IAuditLoginRepository extends IBaseRepository<IAuditLogin> {
  userLoggedIn(params: { user_id: string; ip: string }): Promise<IAuditLogin>;
}
