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

let hotelId: number;

beforeEach(async () => {
  await clearDatabase();
  settings = await createBasicSettings();
  const hotels = (await createBasicHotels()) as Hotel[];
  hotelId = hotels[2].id;
  await createBasicRooms(hotels);
  await createBasicHotelOptions();
  await createBasicTicketOptions();
});

afterAll(async () => {
  await clearDatabase();
  await endConnection();
});

async function generateData() {
  const user = await createUser();
  const token = createToken(user.id);
  await Session.createNew(user.id, token);
  const enrollment = await createEnrollment(user.id);
  await createBookingWithHotel(enrollment.id);
  return token;
}

describe("GET /rooms/:hotelID", () => {
  it("should return status 403 when hotel doesn't exits", async () => {
    const token = await generateData();
    const response = await agent
      .get(`/rooms/${hotelId + 1}`)
      .set(createAuthHeader(token));
    expect(response.status).toEqual(403);
  });
  it("should return an array with one element when hotel exists", async () => {
    const token = await generateData();
    const response = await agent
      .get(`/rooms/${hotelId}`)
      .set(createAuthHeader(token));
    expect(response.status).toEqual(200);
    expect(response.body.length).toEqual(1);
  });
});
