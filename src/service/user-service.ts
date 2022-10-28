import { IAppUserRepo } from "../repo/i-user-repo";

export class UserService {
  private readonly userRepo: IAppUserRepo;

  constructor(userRepo: IAppUserRepo) {
    this.userRepo = userRepo;
  }
}
