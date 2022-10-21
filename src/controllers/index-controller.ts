import express from "express";
import { RouterUris } from "../config/router-uri";
import { Initializable } from "../utility/Initializable";

export class IndexController implements Initializable {
  private readonly _router: express.Router;
  private readonly _baseUrl = RouterUris.INDEX;

  private readonly getHandler = (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    res.render("index");
  };

  constructor(_router: express.Router) {
    this._router = _router;
  }

  public init(): void {
    this._router.get(this._baseUrl, (req, res, next) =>
      this.getHandler(req, res, next)
    );
  }

  public get baseUrl() {
    return this._baseUrl;
  }
}
