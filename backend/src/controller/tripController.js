//recv the user information
//validation the required information
//send the information to out AI trip planner
//calculate the budget per night
//search mongodb for suitable properties
//send both ai trip plan + matching properties back to the fromtend/user
import { Property } from "../models/propertyModel.js";
import { planTrip } from "../ai/tripPlanner.js";
import {generateDescription} from "../ai/generateDescription.js"

// Clean city name
const cleanCity = (text) =>
    text.toLowerCase().trim().replaceAll(" ", "");

// Create trip plan
const createTripPlan = async (req, res) => {
    try {
        const {
            destination,
            budget,
            days,
            people,
            interests
        } = req.body;

        // Validate required information
        if (!destination || !budget || !days || !people) {
            return res.status(400).json({
                status: "fail",
                message: "Please fill in destination, budget, days and people"
            });
        }

        // Generate AI trip plan
        const plan = await planTrip({
            destination,
            budget,
            days,
            people,
            interests: interests || []
        });

        // Calculate budget per night
        const perNight = Number(budget) / Number(days);

        const city = cleanCity(destination);

        // Search suitable properties
        const properties = await Property.find({
            $or: [
                { "address.city": city },
                { "address.state": city },
                { "address.area": city }
            ],
            price: { $lte: perNight },
            maximumGuest: { $gte: Number(people) }
        }).limit(6);

        return res.status(200).json({
            status: "success",
            data: {
                plan,
                properties,
                perNight
            }
        });

    } catch (error) {
        console.error("Trip Plan Error:", error);

        return res.status(500).json({
            status: "fail",
            message: "Could not create a trip plan, please try again"
        });
    }
};


const writeDescription = async(req,res) =>{
    try{
        const description = await generateDescription(req.body);
        res.status(200).json({status:"success",data:{description}})

    }catch(error){
        res.status(500).json({
            status: "fail",
            message: "Could not generate a description"
        });

    }
}
export { createTripPlan,writeDescription };
