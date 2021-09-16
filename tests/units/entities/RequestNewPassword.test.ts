/* eslint-disable @typescript-eslint/no-empty-function */
import RequestNewPassword from "../../../src/entities/RequestNewPassword";
import faker from "faker";

jest.mock("typeorm", () => {
  return {
    BaseEntity: class MockedBaseEntity {
      static async findOne(): Promise<RequestNewPassword> {return null;}
      static async delete(): Promise<null> {return null;}
    },
    Entity: () => {},
    PrimaryGeneratedColumn: () => {},
    Column: () => {}
  };
});

jest.mock("dayjs", () =>
  jest.fn((...args) => jest.requireActual("dayjs")(args.filter((arg) => arg).length > 0 ? args : "2020-08-12")),
);

describe("getEmailByToken", () => {
  it("returns the email if token is valid", async () => {
    const mockEmail = faker.internet.email();
    jest.spyOn(RequestNewPassword, "findOne").mockImplementationOnce(async () => {return {
      email: mockEmail,
      createAt: new Date
    } as RequestNewPassword;});

    const result = await RequestNewPassword.getEmailByToken(faker.datatype.uuid());
    expect(result).toBe(mockEmail);
  });
});
