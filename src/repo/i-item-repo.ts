import { IItem } from "../models/item";
import { Doc, QueryResult } from "../types-alias/mongoose-query-result";

export interface IItemRepo {
  findById(id: string): Promise<QueryResult<IItem> | void>;
  findAll(): Promise<QueryResult<IItem>[] | void>;
  save(item: Doc<IItem>): Promise<Doc<IItem> | void>;
  findByCategoryId(id: string): Promise<QueryResult<IItem>[] | void>;
}
