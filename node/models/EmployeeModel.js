//importamos conexion a bd
import db from "../database/db.js";
import { DataTypes } from "sequelize";

const EmployeeModel =  db.define('employee',{
    idemployee:{ type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true  },
    firstname:{ type: DataTypes.STRING},
    lastname:{ type: DataTypes.STRING},
    birthdate:{ type: DataTypes.DATE},
    ssn:{ type: DataTypes.STRING},
    address:{ type: DataTypes.STRING},
    city:{ type: DataTypes.STRING},
    zipcode:{ type: DataTypes.STRING},
    phone:{ type: DataTypes.STRING},
    email:{ type: DataTypes.STRING},
    isActive:{ type: DataTypes.BOOLEAN},
    employenumber:{ type: DataTypes.STRING},
    hiredate:{ type: DataTypes.DATE},
    ismechanic:{ type: DataTypes.BOOLEAN},
   
},{
    timestamps: false
});

export default EmployeeModel;