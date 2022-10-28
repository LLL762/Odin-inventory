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

export class AppUserInfos {
  private static readonly _BLACK_LIST_CHARACTERS = ["$", "#", "@", "%", "{", "}"];

  public static get BLACK_LIST_CHARACTERS(): string[] {
    return JSON.parse(JSON.stringify(AppUserInfos._BLACK_LIST_CHARACTERS));
  }
}

const appUserSchema = new Schema<IAppUser>(
  {
    username: {
      type: String,
      required: [true, "name : name is required"],
      trim: true,
      maxlength: [255, "name : max 255 characters"],
      minlength: [5, "name : min 5 characters"],
      validate: {
        validator: (value: string) =>
          !AppUserInfos.BLACK_LIST_CHARACTERS.some((string) =>
            value.includes(string)
          ),
        message: () => `name : characters ${AppUserInfos.BLACK_LIST_CHARACTERS} are forbidden`,
      },
      unique: true,
    },
    password: {
      type: String,
      required: [true, "password : password is required"],
      trim: true,
      maxlength: [255, "password : max 255 characters"],
      validate: {
        validator: (value: string) => ValidationUtility.isStrongPassword(value),
        message: () => "password is not strong enough",
      }
    },
    email: {
      type: String,
      required: [true, "email : email is required"],
      trim: true,
      maxlength: [255, "email: max 255 characters"],
      validate: {
        validator: (value: string) => validator.isEmail(value),
        message: () => "email : not a valid email address",
      },
      unique: true
    },
    roles: {
      type: [{ type: Types.ObjectId, ref: "Role" }],
    },
  },
  { collection: "appUsers" }
);


export const AppUser = model<IAppUser>("AppUser", appUserSchema);

appUserSchema.pre("save", function (next) {
  //hash password
});
