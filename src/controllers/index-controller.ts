import { Request, Response, NextFunction, Router } from "express";
import { RouterUris } from "../config/router-uri";
import { IItem } from "../models/item";
import { ItemRepo } from "../repo/item-repo";
import { Initializable } from "../utility/Initializable";

export class IndexController implements Initializable {
  private readonly _router: Router;
  private readonly _baseUrl = RouterUris.INDEX;
  private readonly _itemRepo: ItemRepo;

  constructor(_router: Router, _itemRepo: ItemRepo) {
    this._router = _router;
    this._itemRepo = _itemRepo;
  }

  private readonly getHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const items = await this._itemRepo.findAll();

    console.log(items);

    console.log((items as IItem[])[0].categories[0]);
    console.log((items as IItem[])[0].categories[0].name);

    res.render("index", { title: "Express", items: items });
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
