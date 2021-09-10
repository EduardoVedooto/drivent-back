import supertest from "supertest";
import httpStatus from "http-status";

import app, { init } from "@/app";
import { clearDatabase, endConnection } from "../utils/database";
import {
  createBasicSettings,
  createBasicHotelOptions,
  createBasicTicketOptions,
} from "../utils/app";
import { createUser, createSession } from "../factories/userFactory";
import { createEnrollment } from "../factories/enrollmentFactory";
import { createBooking } from "../factories/bookingFactory";

const agent = supertest(app);

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await clearDatabase();
  await createBasicSettings();
  await createBasicHotelOptions();
  await createBasicTicketOptions();
});

afterAll(async () => {
  await clearDatabase();
  await endConnection();
});

async function generateData() {
  const user = await createUser();
  const session = await createSession(user.id);
  const enrollment = await createEnrollment(user.id);

  const body = {
    enrollmentId: enrollment.id,
    hotel: true,
    type: "Presencial",
  };

  return { user, session, enrollment, body };
}

describe("POST /booking", () => {
  it("should create a new booking or update an existing one when receive a valid body", async () => {
    const { session, enrollment, body } = await generateData();

    const response = await agent
      .post("/booking")
      .send(body)
      .set("Authorization", `Bearer ${session.token}`);

    expect(response.statusCode).toEqual(httpStatus.CREATED);
    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        isPaid: false,
        enrollmentId: enrollment.id,
        ticketOption: expect.objectContaining({
          type: "Presencial",
          price: 25000,
        }),
        hotelOption: expect.objectContaining({
          name: "Com Hotel",
          price: 35000,
        }),
      })
    );
  });

  it("should return NOT FOUNd (404) for invalid enrollmentId", async () => {
    const { session, enrollment, body } = await generateData();

    body.enrollmentId = enrollment.id + 10;

    const response = await agent
      .post("/booking")
      .send(body)
      .set("Authorization", `Bearer ${session.token}`);

    expect(response.statusCode).toEqual(httpStatus.NOT_FOUND);
  });

  it("should return NOT ACCEPTABLE (406) for invalid enrollmentId", async () => {
    const { session, enrollment, body } = await generateData();

    await createBooking(enrollment.id, true);

    const response = await agent
      .post("/booking")
      .send(body)
      .set("Authorization", `Bearer ${session.token}`);

    expect(response.statusCode).toEqual(httpStatus.NOT_ACCEPTABLE);
  });
});

describe("GET /booking", () => {
  it("should return an array containing all booking", async () => {
    const { session, enrollment } = await generateData();

    await createBooking(enrollment.id, false);

    const response = await agent
      .get("/booking")
      .set("Authorization", `Bearer ${session.token}`);

    expect(response.statusCode).toEqual(httpStatus.OK);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          isPaid: expect.any(Boolean),
          enrollmentId: expect.any(Number),
          ticketOption: expect.objectContaining({
            type: expect.any(String),
            price: expect.any(Number),
          }),
          hotelOption: expect.objectContaining({
            name: expect.any(String),
            price: expect.any(Number),
          }),
        }),
      ])
    );
  });

  it("should return an empty array when there is no booking", async () => {
    const { session } = await generateData();

    const response = await agent
      .get("/booking")
      .set("Authorization", `Bearer ${session.token}`);

    expect(response.statusCode).toEqual(httpStatus.OK);
    expect(response.body).toEqual([]);
  });
});

describe("GET /booking/:enrollmentId/find", () => {
  it("should return an object with booking info for an specific enrollmentId", async () => {
    const { session, enrollment } = await generateData();

    await createBooking(enrollment.id, false);

    const response = await agent
      .get(`/booking/${enrollment.id}/find`)
      .set("Authorization", `Bearer ${session.token}`);

    expect(response.statusCode).toEqual(httpStatus.OK);
    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        isPaid: expect.any(Boolean),
        enrollmentId: expect.any(Number),
        ticketOption: expect.objectContaining({
          type: expect.any(String),
          price: expect.any(Number),
        }),
        hotelOption: expect.objectContaining({
          name: expect.any(String),
          price: expect.any(Number),
        }),
      })
    );
  });

  it("should return NOT FOUNd (404) for invalid enrollmentId", async () => {
    const { session, enrollment } = await generateData();

    const response = await agent
      .get(`/booking/${enrollment.id + 10}/find`)
      .set("Authorization", `Bearer ${session.token}`);

    expect(response.statusCode).toEqual(httpStatus.NOT_FOUND);
  });

  it("should return NOT FOUNd (404) when there is no booking", async () => {
    const { session, enrollment } = await generateData();

    const response = await agent
      .get(`/booking/${enrollment.id}/find`)
      .set("Authorization", `Bearer ${session.token}`);

    expect(response.statusCode).toEqual(httpStatus.NOT_FOUND);
  });
});

describe("POST /booking/:bookingId/payment", () => {
  it("should return status OK (201) when receives payment", async () => {
    const { session, enrollment } = await generateData();

    const booking = await createBooking(enrollment.id, false);

    const response = await agent
      .post(`/booking/${booking.id}/payment`)
      .send({})
      .set("Authorization", `Bearer ${session.token}`);

    expect(response.statusCode).toEqual(httpStatus.OK);
  });

  it("should return status CONFLICT (409) when payment is already done", async () => {
    const { session, enrollment } = await generateData();

    const booking = await createBooking(enrollment.id, false);

    await agent
      .post(`/booking/${booking.id}/payment`)
      .send({})
      .set("Authorization", `Bearer ${session.token}`);

    const response = await agent
      .post(`/booking/${booking.id}/payment`)
      .send({})
      .set("Authorization", `Bearer ${session.token}`);

    expect(response.statusCode).toEqual(httpStatus.CONFLICT);
  });

  it("should return status CONFLICT (409) when payment is already done", async () => {
    const { session } = await generateData();

    const notExistingBookingId = 123456789;
    const response = await agent
      .post(`/booking/${notExistingBookingId}/payment`)
      .send({})
      .set("Authorization", `Bearer ${session.token}`);

    expect(response.statusCode).toEqual(httpStatus.NOT_FOUND);
  });
});
