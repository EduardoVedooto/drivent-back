import Hotel from "@/entities/Hotel";
import Room from "@/entities/Room";
import HotelOption from "@/entities/HotelOption";
import Setting from "@/entities/Setting";
import TicketOption from "@/entities/TicketOption";
import Dates from "@/entities/Dates";

export async function createBasicSettings() {
  const startDate = Setting.create({
    name: "start_date",
    value: new Date().toISOString(),
  });
  const endDate = Setting.create({
    name: "end_date",
    value: new Date().toISOString(),
  });
  const eventTitle = Setting.create({
    name: "event_title",
    value: "Test Event",
  });
  const backgroundImage = Setting.create({
    name: "background_image",
    value: "red",
  });
  const logoImage = Setting.create({ name: "logo_image", value: "logo.png" });

  await Setting.save([
    startDate,
    endDate,
    eventTitle,
    backgroundImage,
    logoImage,
  ]);

  return {
    startDate,
    endDate,
    eventTitle,
    backgroundImage,
    logoImage,
  };
}

export async function createBasicHotels() {
  const h1 = Hotel.create({
    name: "Driven Resort",
    imgUrl: "https://i.imgur.com/ZCBgNGO.png",
  });
  const h2 = Hotel.create({
    name: "Driven Palace",
    imgUrl: "https://i.imgur.com/i2dp2Rb.png",
  });
  const h3 = Hotel.create({
    name: "Driven World",
    imgUrl: "https://i.imgur.com/HuGh8VQ.png",
  });

  await Hotel.save([h1, h2, h3]);
  return [h1, h2, h3];
}

export async function createBasicRooms(hotels: Hotel[]) {
  const r1 = Room.create({
    number: "101",
    bedCount: 2,
    hotel: hotels[0],
  });
  const r2 = Room.create({
    number: "102",
    bedCount: 1,
    hotel: hotels[1],
  });
  const r3 = Room.create({
    number: "103",
    bedCount: 3,
    hotel: hotels[2],
  });
  await Room.save([r1, r2, r3]);
  return [r1, r2, r3];
}

export async function createBasicTicketOptions() {
  const to1 = TicketOption.create({
    type: "Online",
    price: 10000,
  });
  const to2 = TicketOption.create({
    type: "Presencial",
    price: 25000,
  });

  return await TicketOption.save([to1, to2]);
}

export async function createBasicHotelOptions() {
  const ho1 = HotelOption.create({
    name: "Sem Hotel",
    price: 0,
  });
  const ho2 = HotelOption.create({
    name: "Com Hotel",
    price: 35000,
  });

  return await HotelOption.save([ho1, ho2]);
}

export async function createDates() {
  const date1 = Dates.create({ day: "2021-10-22" });
  const date2 = Dates.create({ day: "2021-10-23" });

  return await Dates.save([date1, date2]);
}

export function createAuthHeader(token: string) {
  return {
    Authorization: `Bearer ${token}`,
  };
}
