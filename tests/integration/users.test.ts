import supertest from "supertest";
import faker from "faker";
import httpStatus from "http-status";
import dayjs from "dayjs";

import app, { init } from "@/app";
import Setting from "@/entities/Setting";
import User from "@/entities/User";
import { clearDatabase, endConnection } from "../utils/database";
import { createBasicSettings } from "../utils/app";
import { createUser } from "../factories/userFactory";

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

describe("POST /users", () => {
  it("should create a new user", async () => {
    const userData = {
      email: faker.internet.email(),
      password: "123456"
    };

    const response = await agent.post("/users").send(userData);

    expect(response.statusCode).toEqual(httpStatus.CREATED);
    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        email: userData.email,
        createdAt: expect.any(String)
      })
    );

    const userDatabase = await User.findOne({ email: userData.email });
    expect(userDatabase?.email).toEqual(userData.email);
  });

  it("should not allow creation of user with email that has been already used", async () => {
    const user = await createUser();
    const userData = {
      email: user.email,
      password: "1234567"
    };

    const response = await agent.post("/users").send(userData);

    expect(response.statusCode).toEqual(httpStatus.CONFLICT);

    const usersDatabase = await User.find({ email: userData.email });
    expect(usersDatabase.length).toEqual(1);
  });

  it("should not allow creation of user before event start date", async () => {
    await Setting.update({ name: "start_date" }, { value: dayjs().add(1, "day").toISOString() });

    const userData = {
      email: faker.internet.email(),
      password: "123456"
    };

    const response = await agent.post("/users").send(userData);

    expect(response.statusCode).toEqual(httpStatus.BAD_REQUEST);

    const usersDatabase = await User.find({ email: userData.email });
    expect(usersDatabase.length).toEqual(0);
  });
});
