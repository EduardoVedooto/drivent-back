import httpStatus from "http-status";
import supertest from "supertest";

import app, { init } from "@/app";
import { clearDatabase, endConnection } from "../utils/database";
import { createUser, createSession } from "../factories/userFactory";
import { createBasicSettings, createDates } from "../utils/app";

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
