import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

import { User } from '../schema';
import { BaseRepository } from './base.repository';
import { IUser } from '@core/entities';
import { InjectMongooseModel } from 'common/decorators';
import { IUserRepository } from '@core/interfaces';

@Injectable()
export class UserRepository
  extends BaseRepository<User>
  implements IUserRepository
{
  constructor(
    @InjectMongooseModel(User.name)
    private readonly userModel: Model<User>,
  ) {
    super(userModel);
  }
  findWithMobile(mobile: string): Promise<IUser | null> {
    throw new Error('####');
  }
}
