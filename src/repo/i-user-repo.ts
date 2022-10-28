import { IAppUser } from "../models/app-user";
import { Doc, QueryResult } from "../types-alias/mongoose-query-result";

export interface IAppUserRepo {
  findByUsername(username: string): Promise<QueryResult<IAppUser> | void>;
  findByEmail(email: string): Promise<QueryResult<IAppUser> | void>;
  save(user: Doc<IAppUser>): Promise<void | Doc<IAppUser>>
}
