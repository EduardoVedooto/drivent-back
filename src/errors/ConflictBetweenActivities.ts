export default class ConflictBetweenActivities extends Error {
  constructor(ActivityName: string) {
    super(`Esta atividade possui conflito de horário com a atividade: ${ActivityName}`);

    this.name = "ScheduleConflict";
  }
}
