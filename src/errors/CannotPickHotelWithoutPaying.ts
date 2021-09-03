export default class CannotPickHotelWithoutPaying extends Error {
  constructor() {
    super("Cannot pick hotel without paying");

    this.name = "CannotPickHotelWithoutPaying";
  }
}
