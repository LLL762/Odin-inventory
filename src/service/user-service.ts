import { IAppUserRepo } from "../repo/i-user-repo";
import validator from "validator";
import { AppUser, IAppUser } from "../models/app-user";


export class UserService {
  private readonly userRepo: IAppUserRepo;

  constructor(userRepo: IAppUserRepo) {
    this.userRepo = userRepo;
  }

  public async createUser(body: any) {
    return await this.userRepo.save(new AppUser(body));
  }


  public async findByUsernameOrEmail(usernameOrEmail: string) {
    return validator.isEmail(usernameOrEmail) ?
      await this.userRepo.findByEmail(usernameOrEmail) :
      await this.userRepo.findByUsername(usernameOrEmail);
  }

}
