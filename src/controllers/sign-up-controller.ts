import { log } from "console";
import { Request, Response, Router } from "express";
import { validationResult } from "express-validator";
import { RouterUris } from "../config/router-uri";
import { AppUser, IAppUser } from "../models/app-user";
import { UserService } from "../service/user-service";
import { AppUserValidator } from "../validation/user-validator";
import { IController } from "./i-controller";

export class SignUpController implements IController {
  private readonly baseUrl = RouterUris.SIGN_UP;
  private readonly router: Router;
  private readonly userService: UserService;
  private readonly userValidator: AppUserValidator;

  constructor(
    router: Router,
    userService: UserService,
    userValidator: AppUserValidator,

  ) {
    this.router = router
    this.userService = userService
    this.userValidator = userValidator
  }

  private renderView(
    res: Response,
    user?: IAppUser,
    status?: number
  ) {
    res.status(status ?? 200).render("sign-up", {
      title: "Express",
      signUp: this.baseUrl,
      user: user
    });
  }

  private readonly getHandler = async (req: Request, res: Response) => {
    res.render("sign-up", { signUp: this.baseUrl, user: new AppUser() });
  };

  private readonly postHandler = async (req: Request, res: Response) => {
    const body = req.body;
    const errors = validationResult(req);

    console.log(errors);



    if (!errors.isEmpty()) {
      this.renderView(res, body, 400);
      return;
    }

    const thing = await this.userService.createUser(body);

    console.log(thing);

    res.redirect(RouterUris.INDEX);
  };

  init(): void {
    this.router.get(this.baseUrl, this.getHandler);
    this.router.post(this.baseUrl,
      this.userValidator.doNotHaveId(),
      this.userValidator.doNotHaveRoles(),
      this.userValidator.validateEmail(),
      this.userValidator.validatePassword(),
      this.userValidator.validateUsername(),
      this.postHandler);
  }
}
