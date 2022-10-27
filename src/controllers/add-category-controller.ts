import { NextFunction, Request, Response, Router } from "express";
import { RouterUris } from "../config/router-uri";
import { Category, ICategory } from "../models/category";
import { ICategoryRepo } from "../repo/i-category-repo";
import { IController } from "./i-controller";
import { validationResult } from "express-validator";
import { CategoryValidator } from "../validation/category-validator";

export class AddCategoryController implements IController {
  private readonly _router: Router;
  private readonly _categoryRepo: ICategoryRepo;
  private readonly _baseUrl = RouterUris.CATEGORY_ADD;
  private readonly _categoryValidator: CategoryValidator;

  constructor(
    _router: Router,
    _categoryRepo: ICategoryRepo,
    _categoryValidator: CategoryValidator
  ) {
    this._router = _router;
    this._categoryRepo = _categoryRepo;
    this._categoryValidator = _categoryValidator;
  }

  private renderView(res: Response, category?: ICategory, status?: number) {
    res.status(status ?? 200).render("add-category", {
      title: "Express",
      addUri: this._baseUrl,
      category: category,
    });
  }

  private readonly getHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    this.renderView(res, new Category());
  };

  private readonly postHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const body = req.body;
    const errors = validationResult(req);
    const category = new Category(body);

    console.log(errors);

    if (!errors.isEmpty()) {
      this.renderView(res, category, 400);
      return;
    }

    console.log(category);

    await this._categoryRepo.save(category);

    res.redirect(RouterUris.CATEGORIES);
  };

  init(): void {
    this._router.get(this._baseUrl, this.getHandler);
    this._router.post(
      this._baseUrl,
      this._categoryValidator.shouldNotHaveId(),
      this._categoryValidator.validateName(),
      this._categoryValidator.validateDescription(),
      this._categoryValidator.validateImgUrl(),
      this.postHandler
    );
  }
}
