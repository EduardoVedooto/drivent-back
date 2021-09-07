import supertest from "supertest";

import app, { init } from "@/app";
import { clearDatabase, endConnection } from "../utils/database";
import {
  createAuthHeader,
  createBasicHotelOptions,
  createBasicHotels,
  createBasicRooms,
  createBasicSettings,
  createBasicTicketOptions,
} from "../utils/app";
import { createUser } from "../factories/userFactory";
import {
  createBooking,
  createBookingWithHotel,
} from "../factories/bookingFactory";
import { createEnrollment } from "../factories/enrollmentFactory";
import Session from "@/entities/Session";
import { createToken } from "@/utils/app";
import Hotel from "@/entities/Hotel";

const agent = supertest(app);
let settings = null;

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await clearDatabase();
  settings = await createBasicSettings();
  const hotels = (await createBasicHotels()) as Hotel[];
  await createBasicRooms(hotels);
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
  it("should return status 403 when the booking does not include a hotel", async () => {
    const user = await createUser();
    const token = createToken(user.id);
    await Session.createNew(user.id, token);
    const enrollment = await createEnrollment(user.id);
    const booking = await createBooking(enrollment.id);
    booking.isPaid = true;
    booking.save();
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
    expect(response.body).toEqual([
      {
        id: response.body[0].id,
        name: "Driven Resort",
        imgUrl: "https://i.imgur.com/ZCBgNGO.png",
        beds: 2,
        accommodationsType: ["Double"],
      },
      {
        id: response.body[1].id,
        name: "Driven Palace",
        imgUrl: "https://i.imgur.com/i2dp2Rb.png",
        beds: 1,
        accommodationsType: ["Single"],
      },
      {
        id: response.body[2].id,
        name: "Driven World",
        imgUrl: "https://i.imgur.com/HuGh8VQ.png",
        beds: 3,
        accommodationsType: ["Triple"],
      },
    ]);
  });
});
