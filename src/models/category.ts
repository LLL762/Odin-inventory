import { Schema, model } from "mongoose";

export interface ICategory {
  name: string;
  description: string;
  imgUrl?: string;
}

const categorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String },
    imgUrl: { type: String },
  },
  { collection: "categories" }
);

export const Category = model<ICategory>("Category", categorySchema);
