import { IItem } from "../models/item";
import { Doc, QueryResult } from "../types-alias/mongoose-query-result";

export interface IItemRepo {
  findAll(): Promise<QueryResult<IItem>[] | void>;
  save(item: Doc<IItem>): Promise<Doc<IItem> | void>;
}
