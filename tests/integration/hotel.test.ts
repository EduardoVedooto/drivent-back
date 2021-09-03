import supertest from "supertest";

import app, { init } from "@/app";
import { clearDatabase, endConnection } from "../utils/database";
import { createAuthHeader, createBasicHotelOptions, createBasicHotels, createBasicSettings, createBasicTicketOptions } from "../utils/app";
import { createUser } from "../factories/userFactory";
import { createBooking } from "../factories/bookingFactory";
import { createEnrollment } from "../factories/enrollmentFactory";
import Session from "@/entities/Session";
import { createToken } from "@/utils/app";

const agent = supertest(app);
let settings = null;

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await clearDatabase();
  settings = await createBasicSettings();
  await createBasicHotels();
  await createBasicHotelOptions();
  await createBasicTicketOptions();
});

afterAll(async () => {
  await clearDatabase();
  await endConnection();
});

describe("GET /hotels", () => {
  it("should return status 403 when no payment has been made", async () => {
    const user = await createUser();
    const token = createToken(user.id);
    await Session.createNew(user.id, token);
    const enrollment = await createEnrollment(user);
    await createBooking({
      isPaid: false,
      hotelOptionType: true,
      ticketOptionType: "Online",
      hasHotel: false,
      enrollment
    });
    const response = await agent.get("/hotels").set(createAuthHeader(token));
    expect(response.status).toEqual(403);
  });
});
