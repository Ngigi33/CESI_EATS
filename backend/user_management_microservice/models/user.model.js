import { Sequelize } from "sequelize";

export default (sequelize, Sequelize)=>{
    const User = sequelize.define("users", {
        username:{
            type: Sequelize.STRING,
            unique: true,
        },
        email:{
            type: Sequelize.STRING,
            unique: true,
        },
        password:{
            type: Sequelize.STRING,
            allowNull: false
        },
        phoneNumber:{
            type:Sequelize.STRING(10),
            allowNull:true,
            validate:{
                is: /^[\d+()-\s]+$/i
            }
        },
        address:{
            type:Sequelize.STRING(255),
            allowNull:true
        }

    })

    return User
}