import mongoose from "mongoose"

const connectDB = async()=>{
try
{
    await mongoose.connect(process.env.MONGO_URI)
    console.log('Mongogodb connected')

}catch(error){
    console.error("Mongodb connection failed",error);

    process.exit(1);  //process.exit(0)=prog ended successfully , process.exit()= stops nodejs prog immediately
}
}

export default connectDB;