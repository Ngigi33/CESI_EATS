import express from "express"
import cors from "cors"
import db from "./models/index.js"
import authRoutes from "./routes/auth.routes.js"
import userRoutes from "./routes/user.routes.js"
import dotenv from "dotenv"

dotenv.config()

const app=express()
const corsOptions = {
    origin: "http://localhost:8080"
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
app.use("/api", userRoutes)

const PORT = 8080

db.sequelize.sync({alter:true}).then(() => {
    console.log("Database synchronized")
    app.listen(PORT, ()=>{
        console.log(`Server is running on ${PORT}.`)
    })
})
