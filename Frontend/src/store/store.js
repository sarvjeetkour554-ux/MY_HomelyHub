
import { configureStore } from "@reduxjs/toolkit";
import propertyReducer from "./Property/property-slice";
import propertyDetailsSlice from "./PropertyDetails/PropertyDetails-slice";
import userSlice from "./User/user-slice";
import bookingSlice from "./Booking/booking-slice";
import accomodationSlice from "./Accomodation/Accomodation-slice";
import paymentSlice from "./Payment/payment-slice";


const store = configureStore({
    reducer: {
        properties: propertyReducer,
        propertydetails: propertyDetailsSlice.reducer,
        user: userSlice.reducer,
        booking: bookingSlice.reducer,
        accomodation: accomodationSlice.reducer,
        payment: paymentSlice.reducer
    }
});

export default store;

