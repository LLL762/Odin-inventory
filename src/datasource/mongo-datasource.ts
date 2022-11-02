import mongoose from "mongoose";
import { Datasource } from "./idatasource";

export class MongoDbDatasource implements Datasource {
  constructor() {
    mongoose.set("debug", true);
  }

  public connect(): void {
    const url = process.env.DATASOURCE_URL;

    if (url) {
      mongoose.connect(url, {
        user: process.env.DATASOURCE_USER,
        pass: process.env.DATASOURCE_PASSWORD,
        dbName: process.env.DATASOURCE_DB_NAME,
      });
    } else {
      throw new Error("Datasource url not specified");
    }
  }
}
