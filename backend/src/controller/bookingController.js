import {Property} from "../models/propertyModel.js";
import{Booking} from "../models/bookingModel.js";

//book any property

const createOrder = async(req,res)=>{
    const{propertyId, amount, fromDate, toDate, guests} = req.body;

    //orderId :order_12345667824566
    const orderId = "order_" + Date.now();
    res.json({
        success:true,
        message:"Order created successfully",
        orderId,
        propertyId,
        fromDate,
        toDate,
        guests

    })
}

//verifyPayment
//25,26
//1. save the booking
//2. Block these dates

const verifyPayment = async(req,res)=>{
    const{orderId,bookingDetails,forceStatus} = req.body;

    if(forceStatus === "success"){
        const paymentId = "pay_" + Date.now();

        //save booking
        const newBooking = await Booking.create({
            user: req.user._id,
            property: bookingDetails.propertyId,
            price:bookingDetails.price,
            fromDate:bookingDetails.fromDate,
            toDate:bookingDetails.toDate,
            guests:bookingDetails.guests,
            numberOfnights:bookingDetails.numberOfnights,
            paid:true

        })

        //tell property those dates are taken
        const updatedProperty = await Property.findByIdAndUpdate(
            bookingDetails.propertyId,{
                $push:{
                    currentBooking:{
                       bookingId:newBooking._id,
                       fromDate:bookingDetails.fromDate,
                       toDate:bookingDetails.toDate,
                       userId:req.user._id
                    }
                }
            },
            {new:true}
        );
        res.json({
            sucess:true,
            message:"Payment verified and booking done successfully",
            paymentId,
            orderId,
            booking:newBooking
        });
    }else{
        res.status(400).json({
            success:false,
            message:"Payment failed",
            orderId
        })

  }
}

//get my booking
const getUserBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({user: req.user._id});

        res.status(200).json({
            status: "success",
            data: {
                bookings
            }
        });

    } catch (error) {
        res.status(500).json({
            status: "fail",
            message: error.message
        });
    }
};

//get one booking details
// /:bookingid
const getBookingDetails =  async (req, res) => {
    try{
        const bookings = await Booking.findById(req.params.bookingId);


        res.status(200).json({
            status: "success",
            data: {
                bookings
            }
        });


    }catch(error){
        res.status(500).json({
            status: "fail",
            message: error.message
        });

    }

}

export{getBookingDetails, getUserBookings, createOrder, verifyPayment};


    
