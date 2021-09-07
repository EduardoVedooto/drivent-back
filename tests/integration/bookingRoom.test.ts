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

let roomId: number;

beforeEach(async () => {
  await clearDatabase();
  settings = await createBasicSettings();
  const hotels = (await createBasicHotels()) as Hotel[];
  const rooms = await createBasicRooms(hotels);
  roomId = rooms[2].id
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
    it("should return status 404 when room doesn't exits", async() => {
        const token = await generateData();
        const body = { roomId: roomId + 1 };
        const response = await agent.post(`/booking-room`).set(createAuthHeader(token)).send(body);
        expect(response.status).toEqual(404);
    })
    it("should return status 201 when room exits", async() => {
        const token = await generateData();
        const body = { roomId };
        const response = await agent.post(`/booking-room`).set(createAuthHeader(token)).send(body);
        expect(response.status).toEqual(201);
    })
    it("should return status 409 when user already has a room", async() => {
        const token = await generateData();
        const body = { roomId };
        await agent.post(`/booking-room`).set(createAuthHeader(token)).send(body);
        const response = await agent.post(`/booking-room`).set(createAuthHeader(token)).send(body);
        expect(response.status).toEqual(409);
    })
})
