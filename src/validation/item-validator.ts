import { body, check, oneOf } from "express-validator";
import { ValidationUtility } from "./validation-utilities";

export class ItemValidator {
  public validateName = () =>
    body("name")
      .trim()
      .isLength({ min: 2, max: 255 })
      .withMessage("name : must be between 2 and 255 characters");

  public validateDescription = () =>
    body("description")
      .trim()
      .isLength({ min: 5, max: 5000 })
      .withMessage("name : must be between 5 and 5000 characters");

  public validateCategoriesLength = () =>
    body("categories")
      .custom(
        (value) => Array.isArray(value) && value.length > 0 && value.length <= 2
      )
      .withMessage(
        "Categories should be and array containing between 1 and 2 elements"
      );

  public doNotHaveId = () =>
    check("_id")
      .not()
      .exists()
      .withMessage("request body should not contain an _id field");

  public doNotHaveTrending = () =>
    check("trending")
      .not()
      .exists()
      .withMessage("request body should not contain an trending field");

  public categoriesHaveValidIds = () =>
    oneOf([
      check("categories.*")
        .trim()
        .isMongoId()
        .withMessage("Categories must be valid a Mongo id or none"),

      check("categories.*")
        .trim()
        .custom((value) => value == "none")
        .withMessage("Categories must be valid a Mongo id or none"),
    ]);

  public validatePrice = () =>
    body("price")
      .isDecimal()
      .withMessage("price : must be a number")
      .bail()
      .custom((value) => ValidationUtility.hasLTEDecimals(2)(value))
      .withMessage("price :2 decimals max");

  public validateNbInStock = () =>
    body("nbInStock")
      .isInt({ min: 0 })
      .withMessage("qte : must be a positive integer");

  public validateImgUrl = () =>
    body("imgUrl")
      .optional()
      .trim()
      .isLength({ max: 255 })
      .withMessage("imgUrl : must less than 255 characters")
      .bail()
      .isURL()
      .withMessage("imgUrl : must be a valid url");
}
