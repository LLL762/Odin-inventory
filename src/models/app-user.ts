import { model, Schema, Types } from "mongoose";
import { ValidationUtility } from "../validation/validation-utilities";
import validator from "validator";
import { IRole } from "./role";

export interface IAppUser {
  username: string;
  password: string;
  email: string;
  roles: IRole[];
}

const appUserSchema = new Schema<IAppUser>(
  {
    username: {
      type: String,
      required: [true, "name : name is required"],
      trim: true,
      maxlength: [255, "name : max 255 characters"],
      minlength: [5, "name : min 5 characters"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "password : password is required"],
      trim: true,
      maxlength: [255, "password : max 255 characters"],
      validate: {
        validator: (value: string) => ValidationUtility.isStrongPassword(value),
        message: () => "pasword is not strong enough",
      },
      email: {
        type: String,
        required: [true, "email : email is required"],
        trim: true,
        maxlength: [255, "email: max 255 characters"],
        unique: true,
        validate: {
          validator: (value: string) => validator.isEmail(value),
          message: () => "password is not strong enough",
        },
      },
      roles: {
        type: [{ type: Types.ObjectId, ref: "Role" }],
      },
    },
  },
  { collection: "appUsers" }
);

export const AppUser = model<IAppUser>("Item", appUserSchema);

appUserSchema.pre("save", function (next) {
  //hash password
});
