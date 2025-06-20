import db from"../models/index.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import dotenv from "dotenv"
import { where } from "sequelize"

dotenv.config()
const JWT_SECRET = process.env.JWT_SECRET_KEY

const {user:User, role:Role} = db
export const signup = async (req, res) =>{
    try{
        const {username, email, password, phoneNumber, address, roles} = req.body
        const hashedPassword = await bcrypt.hash(password, 8)
        const userRole = await Role.findOne({where: {name:"user"}})
        const user = await User.create({
            username, 
            email,
            password:hashedPassword,
            phoneNumber,
            address
        })
        await user.setRoles([userRole])
        res.status(201).json({message:"User registered successfully!"})
    }catch(error){
        res.status(500).json({message:error.message})
    }
}

export const signin = async (req, res) =>{
    try{
        //find user and include role
        const {username, password} = req.body
        const user = await User.findOne({
            where:{username},
            include:{model:Role, as:"roles"} //starred
        })
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
        
        //Get roles
        const authorities = user.roles.map((role) => `ROLE_${role.name.toUpperCase()}`)

        res.status(200).json({
            id:user.id,
            username: user.username,
            email:user.email,
            roles: authorities,
            accessToken: token
        })
    }catch(error){
        res.status(500).json({message:error.message})
    }
}