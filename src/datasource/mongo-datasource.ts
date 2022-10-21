import mongoose from "mongoose";
import { DataSourceConfigs } from "../config/data-source-configs";
import { Datasource } from "./idatasource";

export class MongoDbDatasource implements Datasource {
  constructor() {
    mongoose.set("debug", true);
  }

  public connect(): void {
    mongoose.connect(DataSourceConfigs.URL, {
      user: DataSourceConfigs.USER,
      pass: DataSourceConfigs.PASSWORD,
      dbName: DataSourceConfigs.DB_NAME,
    });
  }
}
