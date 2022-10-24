import { Document } from "mongoose";
import { ICategory } from "../models/category";
import { QueryResult } from "../types-alias/mongoose-query-result";
export interface ICategoryRepo {
  findById(id: string): Promise<QueryResult<ICategory> | void>;

  findAll(): Promise<QueryResult<ICategory>[] | void>;

  save(category: Document<ICategory>): Promise<Document<ICategory> | void>;
}
