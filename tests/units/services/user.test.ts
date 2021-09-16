import * as service from "../../../src/services/client/user";
import User from "../../../src/entities/User";
import RequestNewPassword from "../../../src/entities/RequestNewPassword";
import faker from "faker";

describe("resetPassword", () => {
  it("should send an email", async () => {
    jest.spyOn(User, "isEmailRegistered").mockImplementationOnce(async () => {return true;});
    const result = () => service.resetPassword(faker.internet.email());
    expect(result).resolves;
  });

  it("should not send an email if email is not registered", async () => {
    jest.spyOn(User, "isEmailRegistered").mockImplementationOnce(async () => {return false;});
    const result = () => service.resetPassword(faker.internet.email());
    expect(result).resolves;
  });
});

describe("saveNewPassword", () => {
  it("should save the new password if token is valid", async () => {
    const mockEmail = faker.internet.email();
    jest.spyOn(RequestNewPassword, "getEmailByToken").mockImplementationOnce(async () => {return mockEmail;});
    jest.spyOn(User, "updatePassword").mockImplementationOnce(async () => {return {
      id: faker.datatype.number(),
      email: mockEmail,
      createdAt: faker.datatype.datetime(Date.now())
    } as User;});

    const result = await service.saveNewPassword(faker.datatype.string(6), faker.datatype.uuid());
    expect(result).toEqual(expect.objectContaining({
      id: expect.any(Number),
      email: expect.any(String),
      createdAt: expect.any(Date)
    }));
  });
});
