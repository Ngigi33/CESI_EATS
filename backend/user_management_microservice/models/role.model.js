import { Sequelize } from "sequelize";

export default(sequelize, Sequelize) =>{
    const Role = sequelize.define("user_roles", {
        id:{
            type: Sequelize. INTEGER,
            primaryKey: true,
            autoIncrement:true,
        },
        name:{
            type: Sequelize.STRING,
        }
    })

    return Role
}