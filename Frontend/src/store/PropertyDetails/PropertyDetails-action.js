import {propertyDetailsAction} from './PropertyDetails-slice';
import {axiosInstance} from '../../utils/axios';

//fatch details of one specificw property using its id 
//recv property id
//call backend api
// wait for response 
// get the property data 
// store details in redux 
// if error store error in redux

export const getPropertyDetails = (id) => async(dispatch)=>{
    try{
        dispatch(propertyDetailsAction.getListRequest());
        const response = await axiosInstance(`/v1/rent/listing/${id}`)
        console.log(response)
        if(!response){
            throw new error("could not fatch any propertyDetails")
        }

        const{data} = response.data;
        dispatch(propertyDetailsAction.getPropertyDetails(data))
    }catch(error){
        dispatch(propertyDetailsAction.getErrors(error.response.data.error))

    }
}