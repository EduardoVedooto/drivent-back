export default class InvalidPasswordTokenError extends Error {
  constructor() {
    super("Token does not exists");

    this.name = "InvalidPasswordTokenError";
  }
}
