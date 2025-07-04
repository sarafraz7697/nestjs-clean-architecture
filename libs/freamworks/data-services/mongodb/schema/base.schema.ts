import { IBaseEntity } from '@entities/mongodb/base.entity';
import { Prop, SchemaOptions } from '@nestjs/mongoose';
import mongoose from 'mongoose';

// Always convert to string when getting an ObjectId
mongoose.Schema.Types.ObjectId.get((value) => {
  if (value) {
    return value.toString();
  }

  return value;
});

const baseSchemaOptions: SchemaOptions = {
  id: false,
  versionKey: false,
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    currentTime: () => new Date().getTime(),
  },
  toJSON: { getters: true },
  toObject: { getters: true },
};

class BaseSchema implements IBaseEntity {
  _id?: string;

  @Prop({ type: Number })
  created_at?: number;

  @Prop({ type: Number })
  updated_at?: number;

  @Prop({ select: false })
  __v?: number;
}

export { baseSchemaOptions, BaseSchema };
