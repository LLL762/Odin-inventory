import { body, param } from "express-validator";

export class CategoryValidator {
  public validateName = () =>
    body("name")
      .trim()
      .isLength({ min: 2, max: 255 })
      .withMessage("name : must be between 2 and 255 characters");

  public shouldNotHaveId = () =>
    body("_id").custom((value) => {
      if (value) {
        throw new Error("request body should not contain an _id field");
      }
      return true;
    });

  public validateId = () =>
    param("_id").trim().isMongoId().withMessage("_id : must be a valid id");

  public validateDescription = () =>
    body("description")
      .trim()
      .isLength({ min: 10, max: 2500 })
      .withMessage("description : must be between 10 and 2500 characters");

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
