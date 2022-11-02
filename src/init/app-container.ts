import { Router } from "express";
import { AuthFilter } from "../auth/authenticate";
import { AddCategoryController } from "../controllers/add-category-controller";
import { AddItemController } from "../controllers/add-item-controlers";
import { CategoriesController } from "../controllers/categories-controller";
import { IController } from "../controllers/i-controller";
import { IndexController } from "../controllers/index-controller";
import { ItemEditController } from "../controllers/item-edit-controller";
import { LogInController } from "../controllers/log-in-controller";
import { SignUpController } from "../controllers/sign-up-controller";
import { CategoryRepo } from "../repo/category-repo";
import { ICategoryRepo } from "../repo/i-category-repo";
import { IItemRepo } from "../repo/i-item-repo";
import { IAppUserRepo } from "../repo/i-user-repo";
import { ItemRepo } from "../repo/item-repo";
import { AppUserRepo } from "../repo/user-repo";
import { ItemService } from "../service/item-service";
import { UserService } from "../service/user-service";
import { Initializable } from "../utility/Initializable";
import { CategoryValidator } from "../validation/category-validator";
import { ItemValidator } from "../validation/item-validator";
import { AppUserValidator } from "../validation/user-validator";

export class AppContainer implements Initializable {
  private readonly router: Router;

  private readonly categoryRepo: ICategoryRepo = new CategoryRepo();
  private readonly itemRepo: IItemRepo = new ItemRepo();
  private readonly userRepo: IAppUserRepo = new AppUserRepo();
  private readonly itemService: ItemService = new ItemService(
    this.categoryRepo,
    this.itemRepo
  );

  private readonly userService: UserService = new UserService(this.userRepo);
  private readonly categoryValidator = new CategoryValidator();
  private readonly itemValidator = new ItemValidator();
  private readonly userValidator = new AppUserValidator();

  private readonly authFilter = new AuthFilter(this.userService);

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
      new SignUpController(this.router, this.userService, this.userValidator),
      new LogInController(this.router),
    ];
  }

  init(): void {
    this.authFilter.init();
    for (let controller of this.controllers) {
      controller.init();
    }
  }
}
