import { Category, ICategory } from "../models/category";
import { Doc } from "../types-alias/mongoose-query-result";
import { ICategoryRepo } from "./i-category-repo";

export class CategoryRepo implements ICategoryRepo {
  public async findById(id: string) {
    try {
      const result = await Category.findById(id).exec();
      return result;
    } catch (err) {
      return console.log(err);
    }
  }

  public async findByIdIn(ids: string[]) {
    try {
      const result = await Category.find(
        { _id: { $in: ids } },
        { name: 1 }
      ).exec();
      return result;
    } catch (err) {
      return console.log(err);
    }
  }

  public async findAll() {
    try {
      const result = await Category.find().exec();
      return result;
    } catch (err) {
      return console.log(err);
    }
  }

  public async save(category: Doc<ICategory>) {
    try {
      const result = await category.save();
      return result;
    } catch (err) {
      return console.log(err);
    }
  }
}
