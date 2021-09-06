import supertest from "supertest";
import httpStatus from "http-status";

import app, { init } from "@/app";
import { clearDatabase, endConnection } from "../utils/database";
import { createBasicSettings, createBasicHotelOptions, createBasicTicketOptions} from "../utils/app";
import { createUser, createSession } from "../factories/userFactory";
import { createEnrollment } from "../factories/enrollmentFactory";


const agent =  supertest(app);

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

describe("POST /reservation", () => {
  it("should create a new reservation when receive a valid body", async () => {
    const user = await createUser();
    const session = await createSession(user.id);
    const enrollment = await createEnrollment(user.id);

    const body = {
      enrollmentId: enrollment.id,
      hotel: true,
      type: "presencial",
    };

    const response = await agent
      .post("/reservation")
      .send(body)
      .set("Authorization", `Bearer ${session.token}`);

    expect(response.statusCode).toEqual(httpStatus.CREATED);
    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        isPaid: false,
        enrollmentId: enrollment.id,
        ticketOption: expect.objectContaining({
          type: "presencial",
          price: 25000,
        }),
        hotelOption: expect.objectContaining({
          name: "drivent",
          price: 35000,
        }),
      })
    );
  });

  it("should return NOT FOUNd (404) for invalid enrollmentId", async () => {
    const user = await createUser();
    const session = await createSession(user.id);
    const enrollment = await createEnrollment(user.id);

    const body = {
      enrollmentId: enrollment.id +10,
      hotel: true,
      type: "presencial",
    };

    const response = await agent
      .post("/reservation")
      .send(body)
      .set("Authorization", `Bearer ${session.token}`);

    expect(response.statusCode).toEqual(httpStatus.NOT_FOUND);
  
  });

  it("should return CONFLICT (409) for reservations that are already done", async () => {
    const user = await createUser();
    const session = await createSession(user.id);
    const enrollment = await createEnrollment(user.id);

    const body = {
      enrollmentId: enrollment.id,
      hotel: true,
      type: "presencial",
    };

    await agent
      .post("/reservation")
      .send(body)
      .set("Authorization", `Bearer ${session.token}`);

    const response = await agent
      .post("/reservation")
      .send(body)
      .set("Authorization", `Bearer ${session.token}`);

    expect(response.statusCode).toEqual(httpStatus.CONFLICT);
  
  });

});


describe("GET /reservation", () => {
  it("should return an array containing all booking", async () => {
    const user = await createUser();
    const session = await createSession(user.id);
    const enrollment = await createEnrollment(user.id);

    const body = {
      enrollmentId: enrollment.id,
      hotel: true,
      type: "presencial",
    };

    await agent
      .post("/reservation")
      .send(body)
      .set("Authorization", `Bearer ${session.token}`);

    const response = await agent
      .get("/reservation")
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
        })
      ])
    );
  });

  it("should return an empty array when there is no booking", async () => {
    const user = await createUser();
    const session = await createSession(user.id);
    const enrollment = await createEnrollment(user.id);

    const response = await agent
      .get("/reservation")
      .set("Authorization", `Bearer ${session.token}`);

    expect(response.statusCode).toEqual(httpStatus.OK);
    expect(response.body).toEqual([]);
  });
  

});

describe("GET /reservation/:enrollmentId/find", () => {
  it("should return an object with booking info for an specific enrollmentId", async () => {
    const user = await createUser();
    const session = await createSession(user.id);
    const enrollment = await createEnrollment(user.id);

    const body = {
      enrollmentId: enrollment.id,
      hotel: true,
      type: "presencial",
    };

    await agent
      .post("/reservation")
      .send(body)
      .set("Authorization", `Bearer ${session.token}`);

    const response = await agent
      .get(`/reservation/${enrollment.id}/find`)
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
    const user = await createUser();
    const session = await createSession(user.id);
    const enrollment = await createEnrollment(user.id);

    const response = await agent
      .get(`/reservation/${enrollment.id+10}/find`)
      .set("Authorization", `Bearer ${session.token}`);

    expect(response.statusCode).toEqual(httpStatus.NOT_FOUND);
  
  });

  it("should return NOT FOUNd (404) when there is no booking", async () => {
    const user = await createUser();
    const session = await createSession(user.id);
    const enrollment = await createEnrollment(user.id);

    const response = await agent
      .get(`/reservation/${enrollment.id}/find`)
      .set("Authorization", `Bearer ${session.token}`);

    expect(response.statusCode).toEqual(httpStatus.NOT_FOUND);
  });
  

});




describe("POST /reservation/:bookingId/payment", () => {
  it("should return status OK (201) when receives payment", async () => {
    const user = await createUser();
    const session = await createSession(user.id);
    const enrollment = await createEnrollment(user.id);

    const body = {
      enrollmentId: enrollment.id,
      hotel: true,
      type: "presencial",
    };

    const booking = await agent
      .post("/reservation")
      .send(body)
      .set("Authorization", `Bearer ${session.token}`);

    const response = await agent
      .post(`/reservation/${booking.body.id}/payment`)
      .send({})
      .set("Authorization", `Bearer ${session.token}`);

    expect(response.statusCode).toEqual(httpStatus.OK);
  });

  it("should return status CONFLICT (409) when payment is already done", async () => {
    const user = await createUser();
    const session = await createSession(user.id);
    const enrollment = await createEnrollment(user.id);

    const body = {
      enrollmentId: enrollment.id,
      hotel: true,
      type: "presencial",
    };
    

    const booking = await agent
      .post("/reservation")
      .send(body)
      .set("Authorization", `Bearer ${session.token}`);

      await agent
      .post(`/reservation/${booking.body.id}/payment`)
      .send({})
      .set("Authorization", `Bearer ${session.token}`);

    const response = await agent
      .post(`/reservation/${booking.body.id}/payment`)
      .send({})
      .set("Authorization", `Bearer ${session.token}`);

    expect(response.statusCode).toEqual(httpStatus.CONFLICT);
  });



  it("should return status CONFLICT (409) when payment is already done", async () => {
    const user = await createUser();
    const session = await createSession(user.id);
    const enrollment = await createEnrollment(user.id);

    // const body = {
    //   enrollmentId: enrollment.id,
    //   hotel: true,
    //   type: "presencial",
    // };
    
    const notExistingBookingId = 123456789
    const response = await agent
      .post(`/reservation/${notExistingBookingId}/payment`)
      .send({})
      .set("Authorization", `Bearer ${session.token}`);

    expect(response.statusCode).toEqual(httpStatus.NOT_FOUND);
  });
  

});
