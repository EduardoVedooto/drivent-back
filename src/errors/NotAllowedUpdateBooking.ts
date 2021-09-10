export default class NotAllowedUpdateBooking extends Error {
  constructor() {
    super("Não é possível alterar a reserva, pois o pagamento já foi realizado!");

    this.name = "NotFoundBooking";
  }
}
