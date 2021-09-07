import { Router } from "express";

import eventRouter from "@/routers/client/event";
import userRouter from "@/routers/client/user";
import authRouter from "@/routers/client/auth";
import enrollmentRouter from "@/routers/client/enrollment";
import reservationRouter from "@/routers/client/booking";
import hotelRouter from "@/routers/client/hotel";
import roomRouter from "@/routers/client/room";

import tokenValidationMiddleware from "@/middlewares/tokenValidationMiddleware";

const router = Router();

router.use("/event", eventRouter);
router.use("/users", userRouter);
router.use("/auth", authRouter);
router.use("/enrollments", tokenValidationMiddleware, enrollmentRouter);
router.use("/booking", tokenValidationMiddleware, reservationRouter);
router.use("/hotels", tokenValidationMiddleware, hotelRouter);
router.use("/rooms", tokenValidationMiddleware, roomRouter);
router.use("/bookingroom", tokenValidationMiddleware, /* BookingRoomRouter */);

export default router;
