import * as Joi from 'joi';
import { NODE_ENV } from '@constants/application.constant';

export const validationSchema = Joi.object({
  TZ: Joi.string().default('Asia/Tehran'),
  NODE_ENV: Joi.valid(...Object.values(NODE_ENV)).default(NODE_ENV.DEVELOPMENT),
  PORT: Joi.number().port().default(3000),
  VERSION: Joi.string().default('v1'),
  DOMAIN: Joi.string().domain().default('http://localhost'),

  MONGODB_CONNECTION_URI: Joi.string().required(),

  REDIS_CONNECTION_URI: Joi.string().required(),

  ACCESS_JWT_SECRET: Joi.string().required(),
  ACCESS_JWT_EXPIRATION_TIME: Joi.string().required(),

  REFRESH_JWT_SECRET: Joi.string().required(),
  REFRESH_JWT_EXPIRATION_TIME: Joi.string().required(),

  GITLAB_CLIENT_ID: Joi.string().required(),
  GITLAB_CLIENT_SECRET: Joi.string().required(),
  GITLAB_CALLBACK_URL: Joi.string().uri().required(),

  AUTH_CALLBACK: Joi.string().uri().required(),
});
