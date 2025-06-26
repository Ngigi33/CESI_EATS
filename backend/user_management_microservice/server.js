import dotenv from "dotenv"
dotenv.config()

import express from "express"
import cors from "cors"
import db from "./models/index.js"
import authRoutes from "./routes/auth.routes.js"
import userRoutes from "./routes/user.routes.js"


dotenv.config()

const app=express()
const corsOptions = {
    origin: "http://localhost:5173", //5173 for Vite frontend and 8080 for localhost
    credentials: true
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//test route
app.get("/", (req, res)=>{
    res.json({message:"Working route"})
})

//routes
app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)

const PORT = 5000

db.sequelize.sync({alter:true}).then(() => {
    console.log("Database synchronized")
    app.listen(PORT, ()=>{
        console.log(`Server is running on ${PORT}.`)
    })
})

console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);

