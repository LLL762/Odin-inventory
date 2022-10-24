import { Request, Response, Router } from "express";
import { ICategoryRepo } from "../repo/i-category-repo";
import { RouterUris } from "../config/router-uri";
import { IController } from "./i-controller";

export class CategoriesController implements IController {
  private readonly _router: Router;
  private readonly _categoryRepo: ICategoryRepo;
  private readonly _baseUrl = RouterUris.CATEGORIES;

  constructor(_router: Router, _categoryRepo: ICategoryRepo) {
    this._router = _router;
    this._categoryRepo = _categoryRepo;
  }

  private readonly getHandler = async (req: Request, res: Response) => {
    const categories = await this._categoryRepo.findAll();

    res.render("categories", { title: "Express", categories: categories });
  };

  init(): void {
    this._router.get(this._baseUrl, this.getHandler);
  }
}
