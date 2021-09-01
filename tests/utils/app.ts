import Setting from "@/entities/Setting";

export async function createBasicSettings() {
  const startDate = Setting.create({ name: "start_date", value: new Date().toISOString() });
  const endDate = Setting.create({ name: "end_date", value: new Date().toISOString() });
  const eventTitle = Setting.create({ name: "event_title", value: "Test Event" });
  const backgroundImage = Setting.create({ name: "background_image", value: "red" });
  const logoImage = Setting.create({ name: "logo_image", value: "logo.png" });

  await Setting.save([startDate, endDate, eventTitle, backgroundImage, logoImage]);

  return {
    startDate,
    endDate,
    eventTitle,
    backgroundImage,
    logoImage
  };
}
