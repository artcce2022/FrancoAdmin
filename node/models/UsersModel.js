//importamos conexion a bd
import db from "../database/db.js";
import { DataTypes } from "sequelize";

const UsersModel =  db.define('users',{
    idUser:{ type: DataTypes.INTEGER},
    userid:{ type: DataTypes.STRING},
    name:{ type: DataTypes.STRING},
    password:{ type: DataTypes.STRING}
});

export default UsersModel;