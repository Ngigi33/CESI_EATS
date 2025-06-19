 import orderModel from "../backend/models/orderModel.js";
 //import userModel from'../models/userModel.js'
 import stripe from "stripe"

 //user orders for frontend
 const userOrders = async(req,res) =>{
       try {
        const orders = await orderModel.find({userId:req.body.userId});
        res.json({success:true,data:orders})

       }catch (error){
        console.log(error);
        res.json({success:false,message:"Error"})
       }
 }
 export {userOrders}