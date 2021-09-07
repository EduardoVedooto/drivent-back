export default class NotFoundBooking extends Error {
  constructor() {
    super("Reserva não encontrada");

    this.name = "NotFoundBooking";
  }
}
