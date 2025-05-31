import * as mongoose from 'mongoose';
import { IAuditLogin } from '@libs/entities/data-services/mongodb/audit-login.entity';
import { BaseSchema, baseSchemaOptions } from './base.schema';
import { Schema, SchemaFactory } from '@nestjs/mongoose';

type AuditLoginDocument = mongoose.HydratedDocument<AuditLogin>;

const AUDIT_LOGIN_COLLECTION = 'audit-logins';
@Schema({ ...baseSchemaOptions, collection: AUDIT_LOGIN_COLLECTION })
class AuditLogin extends BaseSchema implements IAuditLogin {}

const AuditLoginSchema = SchemaFactory.createForClass(AuditLogin);

export {
  AUDIT_LOGIN_COLLECTION,
  AuditLoginDocument,
  AuditLogin,
  AuditLoginSchema,
};
