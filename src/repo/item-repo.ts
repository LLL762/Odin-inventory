import { IItem, Item } from "../models/item";

export class ItemRepo {
  public findByName(name: string) {
    return Item.findOne<IItem>({ name: name });
  }
}
