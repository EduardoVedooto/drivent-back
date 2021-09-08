import supertest from "supertest";
import httpStatus from "http-status";

import app, { init } from "@/app";
import { clearDatabase, endConnection } from "../utils/database";
import {
  createBasicSettings,
  createBasicTicketOptions,
} from "../utils/app";
import { createUser, createSession } from "../factories/userFactory";


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

async function generateData() {
    const user = await createUser();
    const session = await createSession(user.id);

    return { user, session };
  }

  describe("GET /ticket-options", () => {
    it("should return an array containing all booking", async () => {
    await createBasicTicketOptions();
      const { session } = await generateData();
  
      const response = await agent
        .get("/ticket-options")
        .set("Authorization", `Bearer ${session.token}`);
  
      expect(response.statusCode).toEqual(httpStatus.OK);
      expect(response.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(Number),
            type: expect.any(String),
            price: expect.any(Number),
          }),
        ])
      );
    });
  
    it("should return an empty array if there is no ticket options", async () => {
      const { session } = await generateData();
  
      const response = await agent
        .get("/ticket-options")
        .set("Authorization", `Bearer ${session.token}`);
  
      expect(response.statusCode).toEqual(httpStatus.OK);
      expect(response.body).toEqual([]);
    });
  });