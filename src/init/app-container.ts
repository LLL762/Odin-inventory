import { Router, Application, application } from "express";
import { AddCategoryController } from "../controllers/add-category-controller";
import { AddItemController } from "../controllers/add-item-controlers";
import { CategoriesController } from "../controllers/categories-controller";
import { IController } from "../controllers/i-controller";
import { IndexController } from "../controllers/index-controller";
import { ItemEditController } from "../controllers/item-edit-controller";
import { CategoryRepo } from "../repo/category-repo";
import { ICategoryRepo } from "../repo/i-category-repo";
import { IItemRepo } from "../repo/i-item-repo";
import { ItemRepo } from "../repo/item-repo";
import { ItemService } from "../service/item-service";
import { Initializable } from "../utility/Initializable";
import { CategoryValidator } from "../validation/category-validator";
import { ItemValidator } from "../validation/item-validator";

export class AppContainer implements Initializable {
  private readonly router: Router;
  private readonly categoryRepo: ICategoryRepo = new CategoryRepo();
  private readonly itemRepo: IItemRepo = new ItemRepo();
  private readonly itemService: ItemService = new ItemService(
    this.categoryRepo,
    this.itemRepo
  );
  private readonly categoryValidator = new CategoryValidator();
  private readonly itemValidator = new ItemValidator();

  private readonly controllers: IController[];

  constructor(router: Router) {
    this.router = router;
    this.controllers = [
      new IndexController(this.router, this.itemRepo),
      new AddCategoryController(
        this.router,
        this.categoryRepo,
        this.categoryValidator
      ),
      new CategoriesController(this.router, this.categoryRepo),
      new AddItemController(this.router, this.itemService, this.itemValidator),
      new ItemEditController(this.router, this.itemService),
    ];
  }

  init(): void {
    for (let controller of this.controllers) {
      controller.init();
    }
  }
}
