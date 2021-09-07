import supertest from "supertest";

import app, { init } from "@/app";
import { clearDatabase, endConnection } from "../utils/database";
import { createAuthHeader, createBasicHotelOptions, createBasicHotels, createBasicRooms, createBasicSettings, createBasicTicketOptions } from "../utils/app";
import { createUser } from "../factories/userFactory";
import { createBooking, createBookingWithHotel } from "../factories/bookingFactory";
import { createEnrollment } from "../factories/enrollmentFactory";
import Session from "@/entities/Session";
import HotelData from "@/entities/Hotel";
import { createToken } from "@/utils/app";
import { createHotel } from "../factories/hotelFactory";
import { createRoom } from "../factories/roomFactory";

const agent = supertest(app);
let settings = null;

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await clearDatabase();
  settings = await createBasicSettings();
  const hotel = await createBasicHotels();
  await createBasicRooms(hotel.id);
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
    const enrollment = await createEnrollment(user.id);
    await createBooking(enrollment.id);
    const response = await agent.get("/hotels").set(createAuthHeader(token));
    expect(response.status).toEqual(403);
  });
  it("should return hotels options", async () => {
    const user = await createUser();
    const token = createToken(user.id);
    await Session.createNew(user.id, token);
    const enrollment = await createEnrollment(user.id);
    await createBookingWithHotel(enrollment.id);
    const response = await agent.get("/hotels").set(createAuthHeader(token));
    expect(response.status).toEqual(200);
    expect(response.body).toContain(
      expect.arrayContaining([{
          name: "hotel",
          imgUrl: "https://imagehotel.com",
          beds: 1,
          accommodationType: ["Single"]
        },

      ])
    );
  })

});
