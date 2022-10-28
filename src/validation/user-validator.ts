import { Request } from "express";
import { body, check } from "express-validator"
import { AppUserInfos } from "../models/app-user";
import { ValidationUtility } from "./validation-utilities";

export class AppUserValidator {

    private readonly _validateUsername = () => body("username")
        .trim()
        .isLength({ min: 5, max: 255 })
        .withMessage("username : must be between 5 and 255 characters")
        .bail()
        .custom((value: string) => {
            if (AppUserInfos.BLACK_LIST_CHARACTERS.some((string) => value.includes(string))) {
                throw new Error(`name : characters ${AppUserInfos.BLACK_LIST_CHARACTERS} are forbidden`);
            }
            return true;
        });

    private readonly _validatePassword = () => body("password")
        .trim()
        .isLength({ max: 255 })
        .withMessage("password : max 255 characters ")
        .bail()
        .custom((value: string) => ValidationUtility.isStrongPassword(value))
        .withMessage("password : at least 1 lowercase, 1 uppercase, 1 special and 1 digit characters, min : 10")
        .custom((value: string, { req }) => value == req.body.confirmPassword)
        .withMessage("confirm-password : password and confirm-password do not matches ");

    private readonly _validateEmail = () => body("email")
        .trim()
        .normalizeEmail()
        .isLength({ max: 255 })
        .withMessage("email : less than 255 characters")
        .bail()
        .isEmail()
        .withMessage("email : not a valid email address");

    private readonly _doNotHaveId = () => check("_id")
        .not()
        .exists()
        .withMessage("request body should not contain an _id field");

    private readonly _doNotHaveRoles = () => check("roles")
        .not()
        .exists()
        .withMessage("request body should not contain an roles field");


    public get doNotHaveRoles() {
        return this._doNotHaveRoles;
    }
    public get doNotHaveId() {
        return this._doNotHaveId;
    }
    public get validateEmail() {
        return this._validateEmail;
    }
    public get validatePassword() {
        return this._validatePassword;
    }
    public get validateUsername() {
        return this._validateUsername;
    }
}
