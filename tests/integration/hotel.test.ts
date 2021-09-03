import supertest from "supertest";

import app, { init } from "@/app";
import Setting from "@/entities/Setting";
import Enrollment from "@/entities/Enrollment";
import { clearDatabase, endConnection } from "../utils/database";
import { createBasicSettings } from "../utils/app";
import { createUser } from "../factories/userFactory";
import { createBooking } from "../factories/bookingFactory";

const agent = supertest(app);
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

describe("GET /hotels", () => {
  it("should return status 403 when no payment has been made", async () => {
    const booking = await createBooking({
      isPaid: false,
      hotelOptionId: 1,
      ticketOptionId: 1,
      hasHotel: false,
    });

    console.log(booking);
    // const response = await agent.get("/event");
    // expect(response.body).toEqual({
    //   startDate: await getSettingValue("start_date"),
    //   endDate: await getSettingValue("end_date"),
    //   eventTitle: await getSettingValue("event_title"),
    //   backgroundImage: await getSettingValue("background_image"),
    //   logoImage: await getSettingValue("logo_image"),
    // });
  });
});
