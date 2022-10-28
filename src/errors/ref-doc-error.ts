export class RefDocsDoNotExistError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "RefDocsDoNotExistError";
  }
}
