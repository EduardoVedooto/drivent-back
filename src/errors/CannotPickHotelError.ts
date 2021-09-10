export default class CannotPickHotel extends Error {
  details: string[];
  driventCode: string;

  constructor(details: string[], code: string) {
    super("Cannot pick hotel");

    this.name = "CannotPickHotel";
    this.details = details;
    this.driventCode = code;
  }
}
