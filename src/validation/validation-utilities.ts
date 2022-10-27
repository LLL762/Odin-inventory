import validator from "validator";

export class ValidationUtility {
  public static readonly isInteger = (nb: number) => Number.isInteger(nb);

  public static readonly getDecimalPart = (nb: number) =>
    nb.toString().split(".")[1] ?? "";

  public static readonly hasLTEDecimals = (maxDecimal: number) => {
    return (nb: number) =>
      ValidationUtility.getDecimalPart(nb).length <= maxDecimal;
  };

  public static readonly isStrongPassword = (value: string) =>
    validator.isStrongPassword(value, {
      minLength: 10,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    });
}
