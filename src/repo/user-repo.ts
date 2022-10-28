import { AppUser, IAppUser } from "../models/app-user";
import { QueryResult } from "../types-alias/mongoose-query-result";
import { IAppUserRepo } from "./i-user-repo";

export class AppUserRepo implements IAppUserRepo {
  public async findByUsername(
    username: string
  ): Promise<void | QueryResult<IAppUser>> {
    try {
      return await AppUser.findOne({ username: username })
        .populate("roles", "name")
        .exec();
    } catch (err) {
      return console.log(err);
    }
  }

  public async findByEmail(
    email: string
  ): Promise<void | QueryResult<IAppUser>> {
    try {
      return await AppUser.findOne({ email: email })
        .populate("roles", "name")
        .exec();
    } catch (err) {
      return console.log(err);
    }
  }
}
