import supertest from "supertest";

import app, { init } from "../../src/app";
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

describe("GET /certificate", () => {
  it("should return status 406 or 200", async () => {
    await createDates();
    const user = await createUser();
    const session = await createSession(user.id);
    
    const response = await agent.get("/certificate").set("Authorization", `Bearer ${session.token}`);
    
    expect([200, 406]).toContain(response.status);
  });
});

