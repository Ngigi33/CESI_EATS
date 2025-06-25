import jwt from "jsonwebtoken"
import db from "../models/index.js"
import dotenv from "dotenv"

dotenv.config()
const JWT_SECRET = process.env.JWT_SECRET_KEY

const{user: User} = db

export const verifyToken = async(req, res, next) =>{
    const token = req.headers["x-access-token"] || req.headers["authorization"]
    if(!token){
        return res.status(403).json({message:"No token provided"})
    }
    try{
        const decoded = jwt.verify(token.replace("Bearer ", ""), JWT_SECRET)
        req.userId = decoded.id 

        const user = await User.findByPk(req.userId)
        if(!user){
            return res.status(401).json({message:"Unauthorized!"})
        }
        req.userRole = user.role
        next()
    }catch(error){
        return res.status(401).json({message: "Unauthorized!"})
    }
}

export const hasRole = (requiredRole) => async(req, res, next) =>{
    if(!req.userRole){
        return res.status(403).json({message: "User not found"})
    }

    if (req.userRole === requiredRole){
        return next()
    }
    return res.status(403).json({message: `Require '${requiredRole}' role`})
}
