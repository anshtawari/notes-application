
import mongoose from "mongoose"

export const conectDB = async () =>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("mongoDB conected sucessfully nigger !!")
    }catch(error){
        console.error("error conecting to mongoDB",error);
        process.exit(1);
    } 
}