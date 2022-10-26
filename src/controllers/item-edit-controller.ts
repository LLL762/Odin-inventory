import { Request, Response, Router } from "express";
import { RouterUris } from "../config/router-uri";
import { IItem } from "../models/item";
import { ItemService } from "../service/item-service";
import { IController } from "./i-controller";

export class ItemEditController implements IController {
  private readonly _baseUrl = RouterUris.ITEM_EDIT;
  private readonly router: Router;
  private readonly itemService: ItemService;

  constructor(router: Router, itemService: ItemService) {
    this.router = router;
    this.itemService = itemService;
  }

  private readonly getHandler = async (req: Request, res: Response) => {
    const id = req.params.id;
    const item = await this.itemService.findById(id);
    const categories = await this.itemService.getAllCategories();

    console.log(item);

    res.render("item-edit", { item: item, categories: categories });
  };

  public init(): void {
    this.router.get(this._baseUrl, this.getHandler);
  }
}
