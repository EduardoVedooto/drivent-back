import supertest from "supertest";

import app, { init } from "@/app";
import Setting from "@/entities/Setting";
import { clearDatabase, endConnection } from "../utils/database";
import { createBasicSettings } from "../utils/app";

const agent =  supertest(app);
let settings = null;

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await clearDatabase();
  settings = await createBasicSettings();
});

afterAll(async () => {
  await clearDatabase();
  await endConnection();
});

describe("GET /event", () => {
  it("should return event settings", async () => {
    const response = await agent.get("/event");
    expect(response.body).toEqual({
      startDate: await getSettingValue("start_date"),
      endDate: await getSettingValue("end_date"),
      eventTitle: await getSettingValue("event_title"),
      backgroundImage: await getSettingValue("background_image"),
      logoImage: await getSettingValue("logo_image")
    });
  });
});

async function getSettingValue(name: string) {
  const setting = await Setting.findOne({ name });
  return setting?.value;
}
