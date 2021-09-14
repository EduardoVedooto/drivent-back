/* eslint-disable @typescript-eslint/no-empty-function */
import * as auth from "../../src/services/client/auth";
import User from "@/entities/User";

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
    jest.spyOn(auth, "setUserSession").mockImplementationOnce(async () => {});

    jest
      .spyOn(User, "findByEmailAndPassword")
      .mockResolvedValueOnce({} as User);

    const session = await auth.signIn("a@b.c", "abc");
    
    expect(session).toEqual(
      expect.objectContaining({
        user: { id: expect.any(Number), email: expect.any(String) },
        token: expect.any(String),
      })
    );
  });
});
