import { MONGOOSE_DB_CONNECTION_NAME } from '@configs/modules';
import { Inject } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';

export const InjectMongooseModel = (model: string) =>
  Inject(getModelToken(model, MONGOOSE_DB_CONNECTION_NAME));
