import { NextFunction, Request, Response, Router } from "express";
import { validationResult } from "express-validator";
import { RouterUris } from "../config/router-uri";
import { RefDocsDoNotExistError } from "../errors/ref-doc-error";
import { ICategory } from "../models/category";
import { IItem, Item } from "../models/item";
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

  private readonly getHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const categories = await this._itemService.getAllCategories();

    this.renderView(res, categories, new Item());
  };

  private readonly postHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const body = req.body;
    const errors = validationResult(req);

    console.log(errors);

    if (!errors.isEmpty()) {
      const categories = await this._itemService.getAllCategories();
      this.renderView(res, categories, body, 400);
      return;
    }

    try {
      await this._itemService.saveItem(body);
    } catch (err) {
      console.log(err);

      if (err instanceof RefDocsDoNotExistError) {
        const categories = await this._itemService.getAllCategories();
        this.renderView(res, categories, body, 400);
        return;
      }
    }

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
