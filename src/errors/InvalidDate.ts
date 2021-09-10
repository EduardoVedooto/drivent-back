export default class InvalidDate extends Error {
  constructor(date: string) {
    super(`${date} não é uma data válida`);

    this.name = "InvalidDateError";
  }
}
