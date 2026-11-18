import {axiosInstance} from  "../../utils/axios";
import { setBookingDetails,setBookings } from "./booking-slice";

//fatch booking details
export const fatchBookingDetails =(bookingId) => async(dispatch)=>{
    try{
        const response = await axiosInstance.get(`/v1/rent/user/booking/${bookingId}`)
        dispatch(setBookingDetails(response.data.data));

    }catch(error){
        console.error("Error fatching booking details",error)

    }

}

//fatch user bookings

export const fatchUserBookings = ()=> async(dispatch)=>{
    try{
        const response = await axiosInstance.get("/v1/rent/user/booking")
        dispatch(setBookings(response.data.data.bookings))

    }catch(error){
        console.log("Error fatching booking" , error)

    }
}