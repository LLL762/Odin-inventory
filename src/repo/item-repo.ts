import { IItem, Item } from "../models/item";
import { Doc, QueryResult } from "../types-alias/mongoose-query-result";
import { IItemRepo } from "./i-item-repo";

export class ItemRepo implements IItemRepo {
  public async findById(id: string): Promise<void | QueryResult<IItem>> {
    try {
      const result = await Item.findOne({ id: id })
        .populate("categories", "name")
        .exec();
      return result;
    } catch (err) {
      return console.log(err);
    }
  }

  public async findAll(): Promise<void | QueryResult<IItem>[]> {
    try {
      const result = await Item.find().populate("categories", "name").exec();
      return result;
    } catch (err) {
      return console.log(err);
    }
  }

  public async save(item: Doc<IItem>): Promise<void | Doc<IItem>> {
    try {
      const result = await item.save();
      return result;
    } catch (err) {
      return console.log(err);
    }
  }

  public async findByCategoryId(id: string) {
    try {
      const result = await Item.find({
        categories: { $elemMatch: { _id: id } },
      }).exec();
      return result;
    } catch (err) {
      return console.log(err);
    }
  }

  public findByName(name: string) {
    return Item.findOne<IItem>({ name: name });
  }
}
