import { model, Schema, Types } from "mongoose";

export interface IRole {
  _id: Types.ObjectId;
  name: string;
  acessLevel: number;
}

const roleSchema = new Schema<IRole>(
  {
    name: {
      type: String,
      required: [true, "name: name is required"],
      trim: true,
      maxlength: [255, "name : max 255 characters"],
      minlength: [2, "name : min 2 characters"],
    },
    acessLevel: {
      type: Number,
      default: 0,
      min: [0, "accessLevel : must be a positive integer "],
      max: [100, "accessLevel : max 100"],
    },
  },
  { collection: "appRoles" }
);

export const Role = model<IRole>("Role", roleSchema);
