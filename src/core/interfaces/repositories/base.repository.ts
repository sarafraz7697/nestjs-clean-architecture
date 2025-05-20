import {
  FilterQuery,
  PipelineStage,
  QueryOptions,
  Types,
  UpdateQuery,
  UpdateWriteOpResult,
} from 'mongoose';

interface IBaseRepository<T> {
  find(filter?: FilterQuery<T>, options?: QueryOptions<T>): Promise<T[]>;

  findOneById(
    id: string | Types.ObjectId,
    options?: QueryOptions<T>,
  ): Promise<T | null>;

  findOne(
    filter?: FilterQuery<T>,
    options?: QueryOptions<T>,
  ): Promise<T | null>;

  createOne(data: T, options?: QueryOptions<T>): Promise<T>;

  updateById(
    id: string,
    data: UpdateQuery<T>,
    options?: QueryOptions<T>,
  ): Promise<T>;

  updateOne(
    filter: FilterQuery<T>,
    data: UpdateQuery<T>,
    options?: QueryOptions<T>,
  ): Promise<T>;

  updateMany(
    filter: FilterQuery<T>,
    data: UpdateQuery<T>,
  ): Promise<UpdateWriteOpResult>;

  deleteMany(filter: FilterQuery<T>): Promise<number>;

  deleteById(id: string): Promise<boolean>;

  count(filter: FilterQuery<T>, options?: any): Promise<number>;

  aggregate(pipeline: Array<PipelineStage>): Promise<any>;
}

export { IBaseRepository };
