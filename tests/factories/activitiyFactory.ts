import Booking from "@/entities/Booking";
import {
  createBasicHotelOptions,
  createBasicTicketOptions,
} from "../utils/app";
import Activities from "../../src/entities/Activities";
import ActivityLocation from "../../src/entities/ActivityLocation";
import Dates from "../../src/entities/Dates";

export async function createActivitiesForDate(date: Dates) {
  const activityLocations = await ActivityLocation.find();

  const a1 = Activities.create({
    name: "a1",
    startsAt: "09:00",
    endsAt: "10:00",
    activityLocationId: activityLocations[0].id,
    maxParticipants: 10,
    date,
  });
  const a2 = Activities.create({
    name: "a2",
    startsAt: "09:00",
    endsAt: "11:00",
    activityLocationId: activityLocations[0].id,
    maxParticipants: 10,
    date,
  });
  const a3 = Activities.create({
    name: "a3",
    startsAt: "09:00",
    endsAt: "09:30",
    activityLocationId: activityLocations[0].id,
    maxParticipants: 0,
    date,
  });

  await Activities.save([a1, a2, a3]);
  return [a1, a2, a3];
}

export async function createActivityLocations() {
  const al1 = ActivityLocation.create({
    name: "al1",
  });

  const al2 = ActivityLocation.create({
    name: "al2",
  });

  const al3 = ActivityLocation.create({
    name: "al3",
  });

  await ActivityLocation.save([al1, al2, al3]);
  return [al1, al2, al3];
}

export async function createBookingWithHotel(enrollmentId: number) {
  const hotelOption = await createBasicHotelOptions();
  const hotelOptionId = hotelOption[1].id;

  const ticketOption = await createBasicTicketOptions();
  const ticketOptionId = ticketOption[1].id;

  const bookingData = {
    isPaid: true,
    enrollmentId,
    ticketOptionId,
    hotelOptionId,
  };

  const booking = await Booking.create(bookingData);
  await booking.save();

  return booking;
}
