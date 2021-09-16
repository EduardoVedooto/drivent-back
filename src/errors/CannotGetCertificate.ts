export default class CannotGetCertificate extends Error {
  details: string;
  driventCode: string;

  constructor() {
    super("Cannot get certificate");

    this.name = "CannotGetCertificate";
    this.details = "Não é possível gerar certificado antes do fim do evento";
    this.driventCode = "5";
  }
}
