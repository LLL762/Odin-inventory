import mongoose, { Schema, model, Types } from "mongoose";
import { ICategory } from "./category";

export interface ICategoryProjection {
  _id: Types.ObjectId;
  name: string;
}

export interface IItem {
  name: string;
  description: string;
  categories: ICategoryProjection[];
  trending?: number;
  price: number;
  nbInStock: number;
  imgUrl: string;
}

const itemSchema = new Schema<IItem>(
  {
    name: { type: String, required: true },
    description: { type: String },
    categories: [{ _id: { type: Types.ObjectId }, name: { type: String } }],
    trending: { type: Number, default: 0 },
    price: { type: Number, required: true },
    nbInStock: { type: Number },
    imgUrl: { type: String },
  },
  { collection: "items" }
);

export const Item = model<IItem>("Item", itemSchema);
