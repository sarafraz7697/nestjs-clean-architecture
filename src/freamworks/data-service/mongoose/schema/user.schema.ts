import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { baseSchemaOptions } from './base.schema';
import { IUser } from '@core/entities';

type UserDocument = mongoose.HydratedDocument<User>;

const USER_COLLECTION = 'users';
@Schema({ ...baseSchemaOptions, collection: USER_COLLECTION })
class User implements IUser {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  phone: string;
}

const UserSchema = SchemaFactory.createForClass(User);

export { User, UserDocument, UserSchema };
