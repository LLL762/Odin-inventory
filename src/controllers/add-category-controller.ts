import { Request, Response, Router } from "express";
import { RouterUris } from "../config/router-uri";
import { Category } from "../models/category";
import { ICategoryRepo } from "../repo/i-category-repo";
import { IController } from "./i-controller";

export class AddCategoryController implements IController {
  private readonly _router: Router;
  private readonly _categoryRepo: ICategoryRepo;
  private readonly _baseUrl = RouterUris.CATEGORY_ADD;

  constructor(_router: Router, _categoryRepo: ICategoryRepo) {
    this._router = _router;
    this._categoryRepo = _categoryRepo;
  }

  private readonly getHandler = async (req: Request, res: Response) => {
    res.render("add-category", { title: "Express" });
  };

  private readonly postHandler = async (req: Request, res: Response) => {
    const body = req.body;
    const category = new Category(body);

    this._categoryRepo.save(category);

    res.redirect(RouterUris.CATEGORIES);
  };

  init(): void {
    this._router.get(this._baseUrl, this.getHandler);
    this._router.post(this._baseUrl, this.postHandler);
  }
}
