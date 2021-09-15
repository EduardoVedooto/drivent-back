export default class ActivityEnrollmentAlreadyExists extends Error {
  constructor() {
    super("You are already subscribed to this activity");

    this.name = "ActivityEnrollmentAlreadyExists";
  }
}
