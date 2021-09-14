import Activities from "@/entities/Activities";

jest.mock("typeorm", () => {
    return {
        BaseEntity: class MockedBaseEntity {
            static async find(){}
        },
        Entity: () => {},
        PrimaryGeneratedColumn: () => {},
        Column:  () => {},
        OneToMany: () => {},
        ManyToOne: () => {},
        OneToOne: () => {},
        JoinColumn: () => {}, 
    };
});

describe("getAll", ()=>{
    it("returns all activities", async () => {
        const asyncFunction = () => Activities.find();
        await expect(asyncFunction).resolves;
    })
})