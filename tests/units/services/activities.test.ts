import * as service from "@/services/client/activities";
import Activities from "@/entities/Activities"

describe("getAllActivities", () => {
    it("returns all activities from entity", async () => {
        jest.spyOn(Activities, "getAll").mockImplementationOnce(async () => {return {} as Activities[]});

        const result = () => service.getAllActivities();

        await expect(result).resolves;
    })
})