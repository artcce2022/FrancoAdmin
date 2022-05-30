//importamos conexion a bd
import db from "../database/db.js";
import { DataTypes } from "sequelize";

const CustomersModel=  db.define('customers',{
    idcustomer:{ type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true  },
    shortname:{ type: DataTypes.STRING},
    company:{ type: DataTypes.STRING},
    firstname:{ type: DataTypes.STRING},
    lastname:{ type: DataTypes.STRING},
    address:{ type: DataTypes.STRING},
    zipcode:{ type: DataTypes.STRING},
    city:{ type: DataTypes.STRING},
    state:{ type: DataTypes.STRING},
    phone:{ type: DataTypes.STRING},
    mobilephone:{ type: DataTypes.STRING},
    email:{ type: DataTypes.STRING} 
   
},{
    timestamps: false,freezeTableName: true
});

export default CustomersModel;