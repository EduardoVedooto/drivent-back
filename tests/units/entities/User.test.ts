/* eslint-disable @typescript-eslint/no-empty-function */
import User from "../../../src/entities/User";
import faker from "faker";

jest.mock("typeorm", () => {
  return {
    BaseEntity: class MockedBaseEntity {
      static async findOne(): Promise<User> {return null;}
      static async createQueryBuilder(): Promise<User> {return null;}
    },
    Entity: () => {},
    PrimaryGeneratedColumn: () => {},
    Column: () => {}
  };
});

describe("isEmailRegistered", () => {
  it("returns true if email is registered", async () => {
    jest.spyOn(User, "findOne").mockImplementationOnce(async () => {return {} as User;});

    const result = await User.isEmailRegistered(faker.internet.email());
    expect(result).toBe(true);
  });

  it("returns false if email is not registered", async () => {
    jest.spyOn(User, "findOne").mockImplementationOnce(async () => {return null;});

    const result = await User.isEmailRegistered(faker.internet.email());
    expect(result).toBe(false);
  });
});

