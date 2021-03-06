import Certificate from "@/entities/Certificate";
import Setting from "@/entities/Setting";
import CannotGetCertificate from "@/errors/CannotGetCertificate";

export async function get(userId: number) {
  const eventSettings = await Setting.getEventSettings();
  const currentDate = new Date();
  if(eventSettings.endDate > currentDate) {
    throw new CannotGetCertificate();
  }

  return await Certificate.getByUserId(userId);
}
