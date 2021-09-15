/* eslint-disable @typescript-eslint/no-empty-function */
import * as auth from "../../src/services/client/auth";
import * as userSession from "../../src/utils/session";
import User from "../../src/entities/User";
import "../../src/setup";

jest.mock("typeorm", () => {
  return {
    BaseEntity: class MockedBaseEntity {
      static async findByEmailAndPassword(): Promise<User> {
        return null;
      }
    },
    Entity: (): void => {},
    PrimaryGeneratedColumn: (): void => {},
    Column: (): void => {},
    OneToMany: (): void => {},
    ManyToOne: (): void => {},
  };
});

describe("signIn", () => {
  it("should return a valid json", async () => {
    jest
      .spyOn(userSession, "setUserSession")
      .mockImplementationOnce(async () => {});

    jest
      .spyOn(User, "findByEmailAndPassword")
      .mockResolvedValueOnce({ id: 0, email: "a@b.com" } as User);

    const session = await auth.signIn("a@b.com", "a");

    expect(session).toEqual(
      expect.objectContaining({
        user: { id: expect.any(Number), email: expect.any(String) },
        token: expect.any(String),
      })
    );
  });
});
