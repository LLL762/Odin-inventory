import { Request, Response, Router } from "express";
import { validationResult } from "express-validator";
import { RouterUris } from "../config/router-uri";
import { ICategory } from "../models/category";
import { ICategoryProjection, IItem, Item } from "../models/item";
import { ICategoryRepo } from "../repo/i-category-repo";
import { IItemRepo } from "../repo/i-item-repo";
import { ItemService } from "../service/item-service";
import { QueryResult } from "../types-alias/mongoose-query-result";
import { ItemValidator } from "../validation/item-validator";
import { IController } from "./i-controller";

export class AddItemController implements IController {
  private readonly _router: Router;
  private readonly _itemService: ItemService;
  private readonly _itemValidator: ItemValidator;
  private readonly _baseUrl = RouterUris.ITEM_ADD;

  constructor(
    _router: Router,
    _itemService: ItemService,
    _itemValidator: ItemValidator
  ) {
    this._router = _router;
    this._itemService = _itemService;
    this._itemValidator = _itemValidator;
  }

  private renderView(
    res: Response,
    categories: void | QueryResult<ICategory>[],
    item?: IItem,
    status?: number
  ) {
    res.status(status ?? 200).render("add-item", {
      title: "Express",
      addUri: this._baseUrl,
      categories: categories,
      item: item,
    });
  }

  private readonly getHandler = async (req: Request, res: Response) => {
    const categories = await this._itemService.getAllCategories();

    this.renderView(res, categories, new Item());
  };

  private readonly postHandler = async (req: Request, res: Response) => {
    const body = req.body;
    const errors = validationResult(req);
    const item = new Item(body);

    console.log(body);
    console.log(errors);
    console.log(body.categories);

    if (!errors.isEmpty()) {
      const categories = await this._itemService.getAllCategories();
      this.renderView(res, categories, item, 400);
      return;
    }

    /*  await this._itemService.saveItem(body); */
    console.log(item);

    res.redirect(RouterUris.INDEX);
  };

  init(): void {
    this._router.get(this._baseUrl, this.getHandler);
    this._router.post(
      this._baseUrl,
      this._itemValidator.doNotHaveId(),
      this._itemValidator.doNotHaveTrending(),
      this._itemValidator.validateName(),
      this._itemValidator.validateDescription(),
      this._itemValidator.validateImgUrl(),
      this._itemValidator.validateCategoriesLength(),
      this._itemValidator.categoriesHaveValidIds(),
      this._itemValidator.validateNbInStock(),
      this._itemValidator.validatePrice(),
      this.postHandler
    );
  }
}
