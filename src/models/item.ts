import mongoose, { Schema, model, Types } from "mongoose";
import { RegexUtilities } from "../utility/regex";
import { ValidationUtility } from "../validation/validation-utilities";
import { ICategory } from "./category";

export interface ICategoryProjection {
  _id: Types.ObjectId;
  name: string;
}

export interface IItem {
  name: string;
  description: string;
  categories: ICategoryProjection[] | null;
  trending?: number;
  price: number;
  nbInStock: number;
  imgUrl: string;
}

const minCategories = 1;
const maxCategories = 2;
const priceMaxDecimals = 2;

const categoriesValidator = (categories: any[]) => {
  return (
    categories.length <= maxCategories && categories.length >= minCategories
  );
};

const itemSchema = new Schema<IItem>(
  {
    name: {
      type: String,
      required: [true, "name is required"],
      trim: true,
      maxlength: [255, "name : max 255 characters"],
      minlength: [2, "name : min 2 characters"],
    },

    description: {
      type: String,
      required: [true, "description is required"],
      trim: true,
      maxlength: [2500, "description : max 2500 characters"],
      minlength: [10, "description : min 10 characters"],
    },
    categories: {
      type: [{ type: Types.ObjectId, ref: "Category" }],
      validate: [
        categoriesValidator,
        `At least ${minCategories} and maximum ${maxCategories}`,
      ],
    },
    trending: {
      type: Number,
      default: 0,
      min: [0, "trending : must be a positive integer"],
      max: [100, "trending : integer between 0 and 100"],
      validate: [ValidationUtility.isInteger, "trending : must be an integer"],
    },
    price: {
      type: Number,
      required: true,
      min: [0, "price : must be positive"],
      validate: [
        ValidationUtility.hasLTEDecimals(priceMaxDecimals),
        `price : no more than ${priceMaxDecimals} decimals`,
      ],
    },
    nbInStock: {
      type: Number,
      required: true,
      default: 0,
      min: [0, "nbInStock : must be positive"],
      validate: [ValidationUtility.isInteger, "stock : must be an integer"],
    },
    imgUrl: {
      type: String,
      trim: true,
      maxlength: [255, "imgUrl : max 255 characters"],
      match: [RegexUtilities.URL_REGEX, "imgUrl : must be a valid url"],
    },
  },
  { collection: "items" }
);

export const Item = model<IItem>("Item", itemSchema);
