import supertest from "supertest";
import faker from "faker";
import httpStatus from "http-status";
import dayjs from "dayjs";

import app, { init } from "@/app";
import { clearDatabase, endConnection } from "../utils/database";
import { createBasicSettings } from "../utils/app";
import { createUser, createSession } from "../factories/userFactory";
import { createEnrollment } from "../factories/enrollmentFactory";

const agent =  supertest(app);

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

describe("POST /reservation", () => {
  it("should create a new reservation", async () => {
    const user = await createUser();
    const session = await createSession(user.id);
    const enrollment = await createEnrollment(user.id);
  
    const body = {
        enrollmentId: enrollment.id,
        hotel: true,
        type: "presencial"
    }

    const response = await agent.post("/reservation").send(body).set("Authorization", `Bearer ${session.token}`);

    expect(response.statusCode).toEqual(httpStatus.CREATED);
    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        isPaid: false,
        enrollmentId: enrollment.id,
        ticketOption: expect.objectContaining({
            type: "presencial",
            price: 25000
        }),
        hotelOption: expect.objectContaining({
            name: "drivent",
            price: 35000
        })
      })
    );

  });

});