import httpStatus from "http-status";
import supertest from "supertest";

import app, { init } from "@/app";
import { clearDatabase, endConnection } from "../utils/database";
import { createUser, createSession } from "../factories/userFactory";
import { createBasicSettings, createDates } from "../utils/app";
import { createActivitiesForDate, createActivityEnrollment, createActivityLocations } from "../factories/activitiyFactory"; 
import { createEnrollment } from "../factories/enrollmentFactory";
import { createBooking } from "../factories/bookingFactory";

const agent = supertest(app);

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await clearDatabase();
  await createBasicSettings();
});

afterAll(async () => {
  await clearDatabase();
  await endConnection();
});

describe("GET /activities/dates", () => {
  it("should returns status 200 and an array containing all dates of activities", async () => {
    await createDates();
    const user = await createUser();
    const session = await createSession(user.id);
    
    const response = await agent.get("/activities/dates").set("Authorization", `Bearer ${session.token}`);
    
    expect(response.statusCode).toBe(httpStatus.OK);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          day: expect.any(String)
        }),
      ])
    );
  });

  it("should returns an empty array if doesn't have any days", async () => {
    const user = await createUser();
    const session = await createSession(user.id);
    
    const response = await agent.get("/activities/dates").set("Authorization", `Bearer ${session.token}`);
    
    expect(response.statusCode).toBe(httpStatus.OK);
    expect(response.body).toEqual([]);
  });

  it("should returns status 401 (Unauthorized) when token is invalid", async () => {    
    const response = await agent.get("/activities/dates").set("Authorization", "Bearer INVALID_TOKEN");
    
    expect(response.statusCode).toBe(httpStatus.UNAUTHORIZED);
  });
});

describe("GET /activities/date/:dateText", () => {
  it("should return array of activities by location for the date", async () => {
    const user = await createUser();
    const session = await createSession(user.id);
    const dates = await createDates();
    const date = dates[0];
    const dateText = date.day;
    await createActivityLocations();
    await createActivitiesForDate(date);

    const response = await agent.get(`/activities/date/${dateText}`).set("Authorization", `Bearer ${session.token}`);
    
    expect(response.statusCode).toBe(httpStatus.OK);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          name: expect.any(String),
          activities: expect.any(Object),
        }),
      ])
    );
  });
});

describe("POST /activities/enroll", () => {
  it("should returns status 201 when body is valid", async () => {
    await createDates();
    const user = await createUser();
    const session = await createSession(user.id);
    const enrollment = await createEnrollment(user.id);
    const booking = await createBooking(enrollment.id, true);
    const dates = await createDates();
    const date = dates[0];
    await createActivityLocations();
    const activities = await createActivitiesForDate(date);

    const response = await agent
      .post("/activities/enroll")
      .send({ activityId: activities[0].id, bookingId: booking.id })
      .set("Authorization", `Bearer ${session.token}`);
    expect(response.status).toEqual(httpStatus.CREATED);
  });

  it("should returns status 404 when body is invalid (activityId invalid)", async () => {
    await createDates();
    const user = await createUser();
    const session = await createSession(user.id);
    const enrollment = await createEnrollment(user.id);
    const booking = await createBooking(enrollment.id, true);

    const response = await agent
      .post("/activities/enroll")
      .send({ activityId: -1, bookingId: booking.id })
      .set("Authorization", `Bearer ${session.token}`);
    expect(response.status).toEqual(httpStatus.NOT_FOUND);
  });

  it("should returns status 404 when body is invalid (bookingId invalid)", async () => {
    await createDates();
    const user = await createUser();
    const session = await createSession(user.id);
    const dates = await createDates();
    const date = dates[0];
    await createActivityLocations();
    const activities = await createActivitiesForDate(date);

    const response = await agent
      .post("/activities/enroll")
      .send({ activityId: activities[0].id, bookingId: -1 })
      .set("Authorization", `Bearer ${session.token}`);
    expect(response.status).toEqual(httpStatus.NOT_FOUND);
  });

  it("should returns status 409 when trying to resubscribe to an activity", async () => {
    await createDates();
    const user = await createUser();
    const session = await createSession(user.id);
    const enrollment = await createEnrollment(user.id);
    const booking = await createBooking(enrollment.id, true);
    const dates = await createDates();
    const date = dates[0];
    await createActivityLocations();
    const activities = await createActivitiesForDate(date);

    const body = { 
      activityId: activities[0].id, 
      bookingId: booking.id 
    };

    await createActivityEnrollment(body.activityId, body.bookingId);

    const response = await agent
      .post("/activities/enroll")
      .send(body)
      .set("Authorization", `Bearer ${session.token}`);
    expect(response.status).toEqual(httpStatus.BAD_REQUEST);
  });

  it("should returns status 409 when trying to resubscribe to an activity", async () => {
    await createDates();
    const user = await createUser();
    const session = await createSession(user.id);
    const enrollment = await createEnrollment(user.id);
    const booking = await createBooking(enrollment.id, true);
    const dates = await createDates();
    const date = dates[0];
    await createActivityLocations();
    const activities = await createActivitiesForDate(date);

    await createActivityEnrollment(activities[0].id, booking.id);

    const response = await agent
      .post("/activities/enroll")
      .send({ 
        activityId: activities[1].id, 
        bookingId: booking.id
      })
      .set("Authorization", `Bearer ${session.token}`);
    expect(response.status).toEqual(httpStatus.CONFLICT);
  });
});
