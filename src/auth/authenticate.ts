import passport from "passport";
import { Strategy } from "passport-local";
import { UserService } from "../service/user-service";
import { Initializable } from "../utility/Initializable";
import bcrypt from "bcryptjs";

export class AuthFilter implements Initializable {
  private readonly userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  init(): void {
    passport.use(
      new Strategy(async (username, password, done) => {
        try {
          const user = await this.userService.findByUsernameOrEmail(username);

          if (!user) {
            return done(null, false, { message: "Incorrect credentials" });
          }

          const arePasswordsMatching = await bcrypt.compare(
            password,
            user.password
          );

          return arePasswordsMatching
            ? done(null, user)
            : done(null, false, { message: "Incorrect credentials" });
        } catch (err) {
          console.log(err);
          return done(err);
        }
      })
    );

    passport.serializeUser(function (user: any, done) {
      done(null, user._id);
    });

    passport.deserializeUser(async (id: string, done) => {
      try {
        const user: any = await this.userService.findUserById(id);
        user.password = "?";
        done(null, user);
      } catch (err) {
        console.log(err);
        done(err);
      }
    });
  }
}
