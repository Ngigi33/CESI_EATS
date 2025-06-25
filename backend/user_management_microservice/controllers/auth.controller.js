import db from"../models/index.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import dotenv from "dotenv"
import { where } from "sequelize"

dotenv.config()
const JWT_SECRET = process.env.JWT_SECRET_KEY

const {user:User} = db
export const signup = async (req, res) =>{
    try{
        const {username, email, password, role} = req.body
        const hashedPassword = await bcrypt.hash(password, 8)
        if(role && !db.ROLES.includes(role)){
            return res.status(400).json({message:"Invalid role provided"})
        }
        const user = await User.create({
            username, 
            email,
            password:hashedPassword,
            role: role || "customer" //default customer
        })

        res.status(201).json({message:"User registered successfully!"})
    }catch(error){
        console.error("Signup error", error)
        res.status(500).json({message:error.message})
    }
}

export const signin = async (req, res) =>{
    try{
        //find user and include role
        const {email, password} = req.body
        const user = await User.findOne({ where:{email} })
        if(!user){
            res.status(404).json({message:"User not found"})
        }
        
        //validate password
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if(!isPasswordValid){
            return res.status(401).json({
                accessToken: null,
                message:"Invalid Password"
            })
        }

        const token = jwt.sign({id:user.id}, JWT_SECRET, {expiresIn: 86400})
        
        res.status(200).json({
            success:true,
            accessToken: token,
            id:user.id,
            username: user.username,
            email:user.email,
            roles: user.role
        })
    }catch(error){
        console.log("SignIn error", error)
        res.status(500).json({message:error.message})
    }
}