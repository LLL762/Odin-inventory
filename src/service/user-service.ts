import { IAppUserRepo } from "../repo/i-user-repo";
import validator from "validator";
import { AppUser, IAppUser } from "../models/app-user";

export class UserService {
  private readonly userRepo: IAppUserRepo;

  constructor(userRepo: IAppUserRepo) {
    this.userRepo = userRepo;
  }

  public async findUserById(id: string) {
    return this.userRepo.findById(id);
  }

  public async createUser(body: any) {
    const userToSave = new AppUser(body);
    const conflictingUsers = (await this.userRepo.usernameOrMailExists(
      userToSave.username,
      userToSave.email
    )) as IAppUser[];

    switch (conflictingUsers.length) {
      case 0:
        return this.userRepo.save(userToSave);
      case 1:
        const conflictingUser = conflictingUsers[0];

        if (conflictingUser.username == userToSave.username) {
          return conflictingUser.email == userToSave.email
            ? "username and email already taken"
            : "username already taken";
        }

        return "email already taken";
      case 2:
        return "username and email already taken";
      default:
        throw new Error();
    }
  }

  public async findByUsernameOrEmail(usernameOrEmail: string) {
    return validator.isEmail(usernameOrEmail)
      ? this.userRepo.findByEmail(usernameOrEmail)
      : this.userRepo.findByUsername(usernameOrEmail);
  }
}
