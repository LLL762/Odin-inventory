import { Schema, model } from "mongoose";
import { RegexUtilities } from "../utility/regex";

export interface ICategory {
  name: string;
  description: string;
  imgUrl?: string;
}

const categorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: [true, "name is required"],
      unique: true, //not a validator
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
    imgUrl: {
      type: String,
      trim: true,
      maxlength: [255, "imgUrl : max 255 characters"],
      match: [RegexUtilities.URL_REGEX, "imgUrl : must be a valid url"],
    },
  },
  { collection: "categories" }
);

export const Category = model<ICategory>("Category", categorySchema);
