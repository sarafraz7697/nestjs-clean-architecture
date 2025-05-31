import { Inject } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { MONGOOSE_DB_CONNECTION_NAME } from '@libs/config';

export const InjectMongoDbModel = (model: string) =>
  Inject(getModelToken(model, MONGOOSE_DB_CONNECTION_NAME));
