/* eslint-disable @typescript-eslint/no-empty-function */
import "../../../src/setup";

import * as certificate from "../../../src/services/client/certificate";
import Setting from "../../../src/entities/Setting";
import CannotGetCertificate from "../../../src/errors/CannotGetCertificate";

interface SettingsReturn {
  startDate: Date;
  endDate: Date;
  eventTitle: string;
  backgroundImage: string;
  logoImage: string;
}

const FURTHER_DATE = new Date("2031-11-25 20:30:00");
const PREVIOUS_DATE = new Date("1950-01-01 01:00:00");
const USER_ID = 1;
const NON_END_DATE_SETTINGS = {
  startDate: PREVIOUS_DATE,
  eventTitle: "Mock",
  backgroundImage: "Mock",
  logoImage: "Mock",
};

jest.mock("typeorm", () => {
  return {
    BaseEntity: class MockedBaseEntity {},
    Entity: (): void => {},
    PrimaryGeneratedColumn: (): void => {},
    Column: (): void => {},
    OneToMany: (): void => {},
    ManyToOne: (): void => {},
    Certificate: class MockedCertificate {
      static async getByUserId(userId: number) {
        return "em breve";
      }
    },
  };
});

describe("get", () => {
  it("should THROW an error for get certificate BEFORE the event ends", async () => {
    jest
      .spyOn(Setting, "getEventSettings")
      .mockResolvedValueOnce({
        endDate: FURTHER_DATE,
        ...NON_END_DATE_SETTINGS,
      } as SettingsReturn);

    const result = () => certificate.get(USER_ID);

    await expect(result).rejects.toThrow(CannotGetCertificate);
  });

  it("should NOT THROW an error for get certificate AFTER the event ends", async () => {
    jest
      .spyOn(Setting, "getEventSettings")
      .mockResolvedValueOnce({
        endDate: PREVIOUS_DATE,
        ...NON_END_DATE_SETTINGS,
      } as SettingsReturn);

    await certificate.get(USER_ID);
  });
});
