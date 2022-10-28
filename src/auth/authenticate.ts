import passport from "passport";
import { Strategy } from "passport-local";
import { UserService } from "../service/user-service";
import { Initializable } from "../utility/Initializable";

export class AuthFilter implements Initializable {
  private readonly userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  init(): void {
    passport.use(new Strategy(async (username, password, done) => {}));
  }
}
