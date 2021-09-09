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
import HotelData from "@/interfaces/hotel";
import { createBookingRoom } from "../factories/bookingRoomFactory";

const agent = supertest(app);
let settings = null;

beforeAll(async () => {
  await init();
});

let roomId: number;

beforeEach(async () => {
  await clearDatabase();
  settings = await createBasicSettings();
  const hotels = (await createBasicHotels()) as Hotel[];
  const rooms = await createBasicRooms(hotels);
  roomId = rooms[2].id;
  await createBasicHotelOptions();
  await createBasicTicketOptions();
});

afterAll(async () => {
  await clearDatabase();
  await endConnection();
});

async function createUserToken(hotel: boolean) {
  const user = await createUser();
  const token = await createToken(user.id);
  await Session.createNew(user.id, token);
  const enrollment = await createEnrollment(user.id);
  if (hotel) await createBookingWithHotel(enrollment.id);
  else await createBooking(enrollment.id);
  return { token, enrollmentId: enrollment.id };
}

describe("GET /hotels", () => {
  it("should return status 403 when no payment has been made", async () => {
    const { token } = await createUserToken(false);
    const response = await agent.get("/hotels").set(createAuthHeader(token));
    expect(response.status).toEqual(403);
  });
  it("should return hotels options", async () => {
    const { token } = await createUserToken(true);
    const response = await agent.get("/hotels").set(createAuthHeader(token));
    expect(response.status).toEqual(200);
    const DrivenResort = response.body.find(
      (hotel: HotelData) => hotel.name === "Driven Resort"
    );
    const DrivenWorld = response.body.find(
      (hotel: HotelData) => hotel.name === "Driven World"
    );
    const DrivenPalace = response.body.find(
      (hotel: HotelData) => hotel.name === "Driven Palace"
    );
    const hotels = [DrivenResort, DrivenWorld, DrivenPalace];
    expect(hotels).toEqual([
      {
        id: hotels[0].id,
        name: "Driven Resort",
        imgUrl: "https://i.imgur.com/ZCBgNGO.png",
        beds: 2,
        accommodationsType: ["Double"],
      },
      {
        id: hotels[1].id,
        name: "Driven World",
        imgUrl: "https://i.imgur.com/HuGh8VQ.png",
        beds: 3,
        accommodationsType: ["Triple"],
      },
      {
        id: hotels[2].id,
        name: "Driven Palace",
        imgUrl: "https://i.imgur.com/i2dp2Rb.png",
        beds: 1,
        accommodationsType: ["Single"],
      },
    ]);
  });
  it("should return only one hotel if user have a booking room", async () => {
    const { token, enrollmentId } = await createUserToken(true);
    await createBookingRoom(enrollmentId, roomId);
    const response = await agent.get("/hotels").set(createAuthHeader(token));
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
  });
});
