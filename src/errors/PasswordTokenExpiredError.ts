export default class PasswordTokenExpiredError extends Error {
  constructor() {
    super("Token validity expired. Over 24 hours has been passed since password reset request");

    this.name = "PasswordTokenExpiredError";
  }
}
