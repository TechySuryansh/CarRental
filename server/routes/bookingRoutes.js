import express from "express";
import { checkAvailabilityOfCar } from "../controllers/bookingController.js";
import { protect } from "../middleware/auth.js";
import { createBooking } from "../controllers/bookingController.js";
import { getUserBookings } from "../controllers/bookingController.js";
import { getOwnerBookings } from "../controllers/bookingController.js";

import { changeBookingStatus } from "../controllers/bookingController.js";


const bookingRouter=express.Router()
// bookingRouter.use(protect)

bookingRouter.post('/check-availability',checkAvailabilityOfCar)
bookingRouter.post('/create-booking',protect,createBooking)
bookingRouter.get('/user-bookings',protect,getUserBookings)
bookingRouter.get('/owner-bookings',protect,getOwnerBookings)
bookingRouter.post('/change-booking-status',protect,changeBookingStatus)


export default bookingRouter