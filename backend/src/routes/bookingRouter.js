import express from "express";
const bookingRouter = express.Router();

import {
    getBookingDetails,getUserBookings, createOrder, verifyPayment

}from "../controller/bookingController.js"

import{protect} from "../controller/authController.js"

bookingRouter.get("/" , protect,getUserBookings);
bookingRouter.get("/:bookingId",protect,getBookingDetails);
bookingRouter.post("/create-order",protect,createOrder);
bookingRouter.post("/verify-payment",protect,verifyPayment);

//these four apis check on postman and working fine. i have tested them on postman and they are working fine.

export{bookingRouter};