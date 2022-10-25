import { ICategory } from "../models/category";
import { Doc, QueryResult } from "../types-alias/mongoose-query-result";
export interface ICategoryRepo {
  findById(id: string): Promise<QueryResult<ICategory> | void>;

  findAll(): Promise<QueryResult<ICategory>[] | void>;

  save(category: Doc<ICategory>): Promise<Doc<ICategory> | void>;

  findByIdIn(ids: string[]): Promise<QueryResult<ICategory>[] | void>;
}
