export default class CannotPickHotelWithOnlineTicket extends Error {
  constructor() {
    super("Cannot pick hotel with online ticket");

    this.name = "CannotPickHotelWithOnlineTicket";
  }
}
