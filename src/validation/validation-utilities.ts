export class ValidationUtility {
  public static readonly isInteger = (nb: number) => Number.isInteger(nb);

  public static readonly getDecimalPart = (nb: number) =>
    nb.toString().split(".")[1] ?? "";

  public static readonly hasLTEDecimals = (maxDecimal: number) => {
    return (nb: number) =>
      ValidationUtility.getDecimalPart(nb).length <= maxDecimal;
  };
}
