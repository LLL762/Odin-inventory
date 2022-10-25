import { Request, Response, Router } from "express";
import { RouterUris } from "../config/router-uri";
import { Item } from "../models/item";
import { ICategoryRepo } from "../repo/i-category-repo";
import { IItemRepo } from "../repo/i-item-repo";
import { ItemService } from "../service/item-service";
import { IController } from "./i-controller";

export class AddItemController implements IController {
  private readonly _router: Router;
  private readonly _itemService: ItemService;
  private readonly _baseUrl = RouterUris.ITEM_ADD;

  constructor(_router: Router, _itemService: ItemService) {
    this._router = _router;
    this._itemService = _itemService;
  }

  private readonly getHandler = async (req: Request, res: Response) => {
    const categories = await this._itemService.getAllCategories();

    res.render("add-item", {
      title: "Express",
      addUri: this._baseUrl,
      categories: categories,
      item: new Item(),
    });
  };

  private readonly postHandler = async (req: Request, res: Response) => {
    const body = req.body;

    await this._itemService.saveItem(body);
    console.log(body);

    res.redirect(RouterUris.INDEX);
  };

  init(): void {
    this._router.get(this._baseUrl, this.getHandler);
    this._router.post(this._baseUrl, this.postHandler);
  }
}
