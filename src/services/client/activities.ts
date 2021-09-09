import ActivityLocation from "@/entities/ActivityLocation";
import Dates from "@/entities/Dates";
import NotFoundError from "@/errors/NotFoundError";

export async function getAllDays(): Promise<Dates[]> {
  return await Dates.getAllDates();
}

export async function getWithDateTextByLocation(dateText: string) {
  const date = await Dates.getWithDateText(dateText);
  if(!date) throw new NotFoundError();
  return ActivityLocation.getActivitiesWithDateId(date.id);
}
