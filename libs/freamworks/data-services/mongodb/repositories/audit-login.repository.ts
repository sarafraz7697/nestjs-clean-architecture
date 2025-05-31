import { Model } from 'mongoose';
import { AuditLogin } from '../schema';
import { Injectable } from '@nestjs/common';
import { BaseRepository } from './base.repository';
import { IAuditLogin } from '@libs/entities/data-services';
import { InjectMongoDbModel } from '@libs/common/decorators';
import { IAuditLoginRepository } from '@interfaces/repositories/mongodb';

@Injectable()
export class AuditLoginRepository
  extends BaseRepository<AuditLogin>
  implements IAuditLoginRepository
{
  constructor(
    @InjectMongoDbModel(AuditLogin.name)
    private readonly auditLoginModel: Model<AuditLogin>,
  ) {
    super(auditLoginModel);
  }
  userLoggedIn(params: { user_id: string; ip: string }): Promise<IAuditLogin> {
    throw new Error('Method not implemented.');
  }
}
