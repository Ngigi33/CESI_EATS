import db from "../models/index.js"

const {user: User} = db

export const publicAccess = (req, res) => {
  res.status(200).send("Home dashboard");
};

export const customerBoard = (req, res) => {
  res.status(200).send("Customer Dashboard: View orders, track delivery");
};

export const deliveryDriverBoard = (req, res) => {
  res.status(200).send("Delivery Driver Dashboard: Assigned deliveries and routes.");
};

export const restaurantOwnerBoard = (req, res) => {
  res.status(200).send("Restaurant Owner Dashboard: Manage menu, view orders.");
};

export const salesAnalyticsBoard = (req, res) => {
  res.status(200).send("Sales & Analytics Dashboard: View performance reports.");
};

export const thirdPartyDeveloperBoard = (req,res) =>{
  res.status(200).send("Third party developer: Get API, access resuable components")
}

//profile (/me)

export const getCurrentUser = async (req,res) =>{
  try{
    const userId = req.userId
    const user = await User.findByPk(userId, {
      attributes:['id', 'username', 'email', 'role'],
    })

    if(!user) return res.status(404).json({message:"User not found!"})
    res.status(200).json(user)
  }catch(error){
    res.status(500).json({message: error.message})
  }
}