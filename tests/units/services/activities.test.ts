import service from "@/services/client/activities";
import Activities from "@/entities/Activities"

describe("getAllActivities", () => {
    it("returns all activities from entity", async () => {
        jest.spyOn(Activities, "getAll").mockImplementationOnce(async () => {});

        const result = () => service.getAllActivities();

        await expect(result).resolves;
    })
})