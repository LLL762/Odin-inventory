import { IAppUser } from "../models/app-user";
import { QueryResult } from "../types-alias/mongoose-query-result";

export interface IAppUserRepo {
  findByUsername(username: string): Promise<QueryResult<IAppUser> | void>;
}
