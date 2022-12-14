import { IAppUser } from "../models/app-user";
import { Doc, QueryResult } from "../types-alias/mongoose-query-result";

export interface IAppUserRepo {
  findById(id: string): Promise<QueryResult<IAppUser> | void>;
  findByUsername(username: string): Promise<QueryResult<IAppUser> | void>;
  findByEmail(email: string): Promise<QueryResult<IAppUser> | void>;
  save(user: Doc<IAppUser>): Promise<void | Doc<IAppUser>>;
  usernameOrMailExists(
    username: string,
    email: string
  ): Promise<QueryResult<IAppUser>[] | void>;
}
