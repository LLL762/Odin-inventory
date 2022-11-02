import { NextFunction, Request, Response, Router } from "express";
import { RouterUris } from "../config/router-uri";
import { IController } from "./i-controller";
import passport from "passport";

export class LogInController implements IController {
  private readonly baseUrl = RouterUris.LOG_IN;
  private readonly router: Router;

  constructor(router: Router) {
    this.router = router;
  }

  private renderView(res: Response, message?: string, status?: number) {
    res.status(status ?? 200).render("log-in", {
      title: "Express",
      logIn: this.baseUrl,
      message: message ?? "",
    });
  }

  private readonly logOut = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    req.logout((err) => (err ? next(err) : res.redirect(RouterUris.INDEX)));
  };

  private readonly getHandler = async (req: Request, res: Response) => {
    const session: any = req.session;

    req.isAuthenticated()
      ? res.redirect(RouterUris.INDEX)
      : this.renderView(res, session?.messages);
  };

  init(): void {
    this.router.get(this.baseUrl, this.getHandler);
    this.router.post(
      this.baseUrl,
      passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: this.baseUrl,
        failureMessage: true,
      })
    );
    this.router.delete(RouterUris.LOG_OUT, this.logOut);
  }
}
