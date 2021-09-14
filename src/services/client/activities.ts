import ActivityBooking from "@/entities/ActivityBooking";
import Activities from "@/entities/Activities";
import ActivityLocation from "@/entities/ActivityLocation";
import Dates from "@/entities/Dates";
import NotFoundError from "@/errors/NotFoundError";

export async function getAllDays(): Promise<Dates[]> {
  return await Dates.getAllDates();
}

export async function getByDateTextByLocation(dateText: string) {
  const date = await Dates.getByDateText(dateText);
  if(!date) throw new NotFoundError();
  return ActivityLocation.getActivitiesWithDateId(date.id);
}

export async function postActivityEnrollment(activityId: number, bookingId: number) {
  await ActivityBooking.postNewEnrollment(activityId, bookingId);
}

export async function getAllActivities() {
  return await Activities.getAll();
}
