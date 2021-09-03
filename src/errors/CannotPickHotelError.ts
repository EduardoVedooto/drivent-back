export default class CannotPickHotel extends Error {
  details: string[];

  constructor(details: string[]) {
    super("Cannot pick hotel");

    this.name = "CannotPickHotel";
    this.details = details;
  }
}
