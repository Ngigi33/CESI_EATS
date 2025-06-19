import mongoose from "mongoose";


export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://ezzoubair123:ezzoubair123@cluster0.d75x2k6.mongodb.net/food-del?').then(()=>console.log("DB Connected"));
}