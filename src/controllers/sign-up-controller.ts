import { Request, Response, Router } from "express";
import { RouterUris } from "../config/router-uri";
import { AppUser } from "../models/app-user";
import { UserService } from "../service/user-service";
import { IController } from "./i-controller";

export class SignUpController implements IController {
  private readonly baseUrl = RouterUris.SIGN_UP;
  private readonly router: Router;
  private readonly userService: UserService;

  constructor(router: Router, userService: UserService) {
    this.router = router;
    this.userService = userService;
  }

  private readonly getHandler = async (req: Request, res: Response) => {
    res.render("sign-up", { user: new AppUser() });
  };

  init(): void {
    this.router.get(this.baseUrl, this.getHandler);
  }
}
