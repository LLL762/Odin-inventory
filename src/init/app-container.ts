import { Router } from "express";
import { AddCategoryController } from "../controllers/add-category-controller";
import { CategoriesController } from "../controllers/categories-controller";
import { IController } from "../controllers/i-controller";
import { IndexController } from "../controllers/index-controller";
import { CategoryRepo } from "../repo/category-repo";
import { ICategoryRepo } from "../repo/i-category-repo";
import { IItemRepo } from "../repo/i-item-repo";
import { ItemRepo } from "../repo/item-repo";
import { Initializable } from "../utility/Initializable";

export class AppContainer implements Initializable {
  private readonly router: Router;
  private readonly categoryRepo: ICategoryRepo = new CategoryRepo();
  private readonly itemRepo: IItemRepo = new ItemRepo();
  private readonly controllers: IController[];

  constructor(router: Router) {
    this.router = router;
    this.controllers = [
      new IndexController(this.router, this.itemRepo),
      new AddCategoryController(this.router, this.categoryRepo),
      new CategoriesController(this.router, this.categoryRepo),
    ];
  }

  init(): void {
    for (let controller of this.controllers) {
      controller.init();
    }
  }
}
