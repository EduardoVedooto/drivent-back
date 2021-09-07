import Room from "@/entities/Room";

export async function createRoom(id: number) {
  const room = Room.create([{
    number: "01",
    bedCount: 1,
    hotelId: id
    }]
  );

  await room.save();

  return room;
}