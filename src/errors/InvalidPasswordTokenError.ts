export default class InvalidPasswordTokenError extends Error {
  constructor() {
    super("Token inválido. Por favor, crie outra requisição");

    this.name = "InvalidPasswordTokenError";
  }
}
