import { Sequelize } from "sequelize";

export default (sequelize, Sequelize)=>{
    const User = sequelize.define("users", {
        username:{
            type: Sequelize.STRING,
            unique: true,
            allowNull:false
        },
        email:{
            type: Sequelize.STRING,
            unique: true,
            allowNull:false
        },
        password:{
            type: Sequelize.STRING,
            allowNull: false
        },
        cart:{
            type:Sequelize.JSON,
            defaultValue:[]
        },
        role:{
            type: Sequelize.ENUM('customer', 'restaurant_owner','delivery_driver', 'sales_team', 'third_party_developer'),
            allowNull:false,
            defaultValue:'customer'
        }

    })

    return User
}