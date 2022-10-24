import { IItem } from "../models/item";
import { QueryResult } from "../types-alias/mongoose-query-result";

export interface IItemRepo {
  findAll(): Promise<QueryResult<IItem>[] | void>;
}
