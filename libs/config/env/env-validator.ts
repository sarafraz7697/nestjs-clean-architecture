import { NODE_ENV } from '@libs/constants';
import * as Joi from 'joi';

export const validationSchema = Joi.object({
  NODE_ENV: Joi.valid(...Object.values(NODE_ENV)).default(NODE_ENV.DEVELOPMENT),
  PORT: Joi.number().port().default(3000),

  MONGODB_CONNECTION_URI: Joi.string(),
  POSTGRES_CONNECTION_URI: Joi.string(),

  REDIS_CONNECTION_URI: Joi.string(),

  ACCESS_JWT_SECRET: Joi.string(),
  ACCESS_JWT_EXPIRATION_TIME: Joi.string(),

  REFRESH_JWT_SECRET: Joi.string(),
  REFRESH_JWT_EXPIRATION_TIME: Joi.string(),
});
