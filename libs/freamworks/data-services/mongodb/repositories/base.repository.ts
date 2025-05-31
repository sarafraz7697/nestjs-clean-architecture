import {
  FilterQuery,
  Model,
  PipelineStage,
  QueryOptions,
  UpdateQuery,
  UpdateWriteOpResult,
} from 'mongoose';
import { IBaseRepository } from '@core/interfaces/repositories/base.repository';

export class BaseRepository<T> implements IBaseRepository<T> {
  constructor(private readonly model: Model<T>) {}

  find(filter?: FilterQuery<T>, options?: QueryOptions<T>): Promise<T[]> {
    return this.model.find(filter, null, options).exec();
  }

  findOneById(id: string, options?: QueryOptions<T>): Promise<T> {
    return this.model.findById(id, null, options).exec();
  }

  findOne(filter?: FilterQuery<T>, options?: QueryOptions<T>): Promise<T> {
    return this.model.findOne(filter, null, options).exec();
  }

  async createOne(data: T, opts?: QueryOptions<T>): Promise<T> {
    const newModel = await this.model.create(data);

    return this.model.findById(newModel._id, null, opts);
  }

  updateById(
    id: string,
    data: UpdateQuery<T>,
    options?: QueryOptions<T>,
  ): Promise<T> {
    return this.model.findByIdAndUpdate(id, data, options).exec();
  }

  updateOne(
    filter: FilterQuery<T>,
    data: UpdateQuery<T>,
    options?: QueryOptions<T>,
  ): Promise<T> {
    return this.model.findOneAndUpdate(filter, data, options).exec();
  }

  updateMany(
    filter: FilterQuery<T>,
    data: UpdateQuery<T>,
  ): Promise<UpdateWriteOpResult> {
    return this.model.updateMany(filter, data);
  }

  async deleteMany(filter: FilterQuery<T>): Promise<number> {
    const deleted = await this.model.deleteMany(filter).exec();
    return deleted.deletedCount;
  }

  async deleteById(id: string): Promise<boolean> {
    const result = await this.model.findByIdAndDelete(id).exec();

    return !!result;
  }

  count(filter: FilterQuery<T>, options?: any): Promise<number> {
    return this.model.countDocuments(filter, options).exec();
  }

  aggregate(pipeline: Array<PipelineStage>): Promise<any> {
    return this.model.aggregate(pipeline).exec();
  }
}
