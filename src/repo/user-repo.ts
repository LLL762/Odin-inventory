import { AppUser, IAppUser } from "../models/app-user";
import { Doc, QueryResult } from "../types-alias/mongoose-query-result";
import { IAppUserRepo } from "./i-user-repo";

export class AppUserRepo implements IAppUserRepo {
  public async findById(id: string): Promise<void | QueryResult<IAppUser>> {
    try {
      const result = await AppUser.findOne({ id: id }).exec();
      return result;
    } catch (err) {
      return console.log(err);
    }
  }

  public async findByUsername(
    username: string
  ): Promise<void | QueryResult<IAppUser>> {
    try {
      return await AppUser.findOne({ username: username }).exec();
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

  public async save(user: Doc<IAppUser>): Promise<void | Doc<IAppUser>> {
    try {
      return await user.save();
    } catch (err) {
      return console.log(err);
    }
  }

  public async usernameOrMailExists(username: string, email: string) {
    try {
      return AppUser.find(
        { $or: [{ email: email }, { username: username }] },
        "username email"
      ).limit(2);
    } catch (err) {
      return console.log(err);
    }
  }
}
