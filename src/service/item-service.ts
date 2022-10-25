import { Category, ICategory } from "../models/category";
import { ICategoryProjection, IItem, Item } from "../models/item";
import { ICategoryRepo } from "../repo/i-category-repo";
import { IItemRepo } from "../repo/i-item-repo";

export class ItemService {
  private readonly _categoryRepo: ICategoryRepo;
  private readonly _itemRepo: IItemRepo;

  constructor(_categoryRepo: ICategoryRepo, _itemRepo: IItemRepo) {
    this._categoryRepo = _categoryRepo;
    this._itemRepo = _itemRepo;
  }

  public async getAllCategories() {
    return await this._categoryRepo.findAll();
  }

  public async saveItem(body: any) {
    const categoriesId: any[] | undefined = body?.categories;

    if (categoriesId === undefined) {
      return;
    }

    delete body["categoriesId"];

    const categoriesIds = categoriesId
      .filter((id) => id != "none")
      .map((id) => id.trim())
      .filter((id) => id.match(/^[0-9a-fA-F]{24}$/));

    const categories = (await this._categoryRepo.findByIdIn(
      categoriesIds
    )) as ICategoryProjection[];

    if (categories.length != categoriesIds.length) {
      return;
    }

    const itemToSave = new Item(body);
    itemToSave.categories = categories;

    return this._itemRepo.save(itemToSave);
  }
}
