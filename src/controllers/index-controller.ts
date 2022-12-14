import { Request, Response, NextFunction, Router } from "express";
import { RouterUris } from "../config/router-uri";
import { IAppUser } from "../models/app-user";
import { ICategory } from "../models/category";
import { ICategoryProjection, IItem } from "../models/item";
import { IItemRepo } from "../repo/i-item-repo";
import { ItemRepo } from "../repo/item-repo";
import { Initializable } from "../utility/Initializable";

export class IndexController implements Initializable {
  private readonly _router: Router;
  private readonly _baseUrl = RouterUris.INDEX;
  private readonly _itemRepo: IItemRepo;

  constructor(_router: Router, _itemRepo: IItemRepo) {
    this._router = _router;
    this._itemRepo = _itemRepo;
  }

  private renderView(res: Response, items: IItem[], user?: any) {
    res.render("index", { title: "Express", items: items, user: user });
  }

  private readonly getHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const items = (await this._itemRepo.findAll()) as IItem[];

    console.log(req.user);

    this.renderView(res, items, req.user);
  };

  public init(): void {
    this._router.get(this._baseUrl, (req, res, next) =>
      this.getHandler(req, res, next)
    );
  }

  public get baseUrl() {
    return this._baseUrl;
  }
}
