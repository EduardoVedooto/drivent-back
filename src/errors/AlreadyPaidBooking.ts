export default class AlreadyPaidBooking extends Error {
  constructor(name: string) {
    super(`Pagamento já efetuado para a reserva de ${name}`);

    this.name = "AlreadyPaidBooking";
  }
}
