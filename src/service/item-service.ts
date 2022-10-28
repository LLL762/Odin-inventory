import { RefDocsDoNotExistError } from "../errors/ref-doc-error";
import { ICategoryProjection, Item } from "../models/item";
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
    return this._categoryRepo.findAll();
  }

  public async findById(id: string) {
    return this._itemRepo.findById(id);
  }

  public async saveItem(body: any) {
    const itemCategoriesIds: string[] | undefined = body?.categories;

    if (itemCategoriesIds === undefined) {
      throw new RefDocsDoNotExistError("must provide at least a category");
    }

    const categoriesIds = itemCategoriesIds
      .filter((id) => id != "none")
      .map((id) => id.trim());
    const categories = (await this._categoryRepo.findByIdIn(
      categoriesIds
    )) as ICategoryProjection[];

    if (categories.length != categoriesIds.length) {
      throw new RefDocsDoNotExistError("categories ids are not referenced");
    }

    const item = new Item(body);
    item.categories = categories;
    return this._itemRepo.save(item);
  }
}
