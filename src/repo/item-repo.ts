import { IItem, Item } from "../models/item";
import { Doc, QueryResult } from "../types-alias/mongoose-query-result";
import { IItemRepo } from "./i-item-repo";

export class ItemRepo implements IItemRepo {
  public async findAll(): Promise<void | QueryResult<IItem>[]> {
    try {
      const result = await Item.find().exec();
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

  public findByName(name: string) {
    return Item.findOne<IItem>({ name: name });
  }
}
