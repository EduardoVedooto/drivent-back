import { Router } from "express";

import eventRouter from "@/routers/client/event";
import userRouter from "@/routers/client/user";
import authRouter from "@/routers/client/auth";
import enrollmentRouter from "@/routers/client/enrollment";
import reservationRouter from "@/routers/client/booking";
import hotelRouter from "@/routers/client/hotel";
import roomRouter from "@/routers/client/room";
import bookingRoomRouter from "@/routers/client/bookingRoom";
import ticketOptionRouter from "@/routers/client/ticketOption";
import hotelOptionRouter from "@/routers/client/hotelOption";
import activitiesRouter from "@/routers/client/activities";

import tokenValidationMiddleware from "@/middlewares/tokenValidationMiddleware";

const router = Router();

router.use("/event", eventRouter);
router.use("/users", userRouter);
router.use("/auth", authRouter);
router.use("/enrollments", tokenValidationMiddleware, enrollmentRouter);
router.use("/booking", tokenValidationMiddleware, reservationRouter);
router.use("/hotels", tokenValidationMiddleware, hotelRouter);
router.use("/rooms", tokenValidationMiddleware, roomRouter);
router.use("/booking-room", tokenValidationMiddleware, bookingRoomRouter);
router.use("/ticket-options", tokenValidationMiddleware, ticketOptionRouter);
router.use("/hotel-options", tokenValidationMiddleware, hotelOptionRouter);
router.use("/activities", tokenValidationMiddleware, activitiesRouter);

export default router;
