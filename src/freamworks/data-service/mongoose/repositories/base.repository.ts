import { IBaseRepository } from '@core/interfaces';
import {
  FilterQuery,
  Model,
  PipelineStage,
  QueryOptions,
  Types,
  UpdateQuery,
  UpdateWriteOpResult,
} from 'mongoose';

export class BaseRepository<T> implements IBaseRepository<T> {
  constructor(private readonly model: Model<T>) {}

  find(filter?: FilterQuery<T>, options?: QueryOptions<T>): Promise<T[]> {
    return this.model.find(filter ?? {}, null, options).exec();
  }

  findOneById(
    id: string | Types.ObjectId,
    options?: QueryOptions<T>,
  ): Promise<T | null> {
    return this.model.findById(id, null, options).exec();
  }

  findOne(
    filter?: FilterQuery<T>,
    options?: QueryOptions<T>,
  ): Promise<T | null> {
    return this.model.findOne(filter ?? {}, null, options).exec();
  }

  async createOne(data: T, opts?: QueryOptions<T>): Promise<T> {
    const newModel = await this.model.create(data);
    const result = await this.model.findById(newModel._id, null, opts).exec();
    if (!result) throw new Error('Created document not found');
    return result;
  }

  async updateById(
    id: string,
    data: UpdateQuery<T>,
    options?: QueryOptions<T>,
  ): Promise<T> {
    const result = await this.model
      .findByIdAndUpdate(id, data, { new: true, ...options })
      .exec();
    if (!result) throw new Error('Document not found for updateById');
    return result;
  }

  async updateOne(
    filter: FilterQuery<T>,
    data: UpdateQuery<T>,
    options?: QueryOptions<T>,
  ): Promise<T> {
    const result = await this.model
      .findOneAndUpdate(filter, data, { new: true, ...options })
      .exec();
    if (!result) throw new Error('Document not found for updateOne');
    return result;
  }

  updateMany(
    filter: FilterQuery<T>,
    data: UpdateQuery<T>,
  ): Promise<UpdateWriteOpResult> {
    return this.model.updateMany(filter, data).exec();
  }

  async deleteMany(filter: FilterQuery<T>): Promise<number> {
    const deleted = await this.model.deleteMany(filter).exec();
    return deleted.deletedCount ?? 0;
  }

  async deleteById(id: string): Promise<boolean> {
    const result = await this.model.findByIdAndDelete(id).exec();
    return !!result;
  }

  count(filter: FilterQuery<T>, options?: any): Promise<number> {
    return this.model.countDocuments(filter, options).exec();
  }

  aggregate(pipeline: Array<PipelineStage>): Promise<any[]> {
    return this.model.aggregate(pipeline).exec();
  }
}
