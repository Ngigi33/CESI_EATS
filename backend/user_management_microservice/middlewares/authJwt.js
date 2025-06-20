import jwt from "jsonwebtoken"
import db from "../models/index.js"
import dotenv from "dotenv"

dotenv.config()
const JWT_SECRET = process.env.JWT_SECRET_KEY

const{user: User, role: Role} = db

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
        next()
    }catch(error){
        return res.status(401).json({message: "Unauthorized!"})
    }
}

export const hasRole = (requiredRole) => async(req, res, next) =>{
    try{
        const user = await User.findByPk(req.userId)
        const roles = await user.getRoles()
        const matchedRole = roles.find((role) =>role.name === requiredRole)
        
        if(!user){
            return res.status(403).json({message:"User not found!"})
        }
        if (matchedRole) return next()
        
        return res.status(403).json({message:`Require ${requiredRole} role`})
    }catch(error){
        res.status(500).json({message: error.message})
    }
}
