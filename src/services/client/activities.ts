import Dates from "@/entities/Dates";

export async function getAllDays(): Promise<Dates[]> {
  return await Dates.getAllDates();
}
