//importamos conexion a bd
import db from "../database/db.js";
import { DataTypes } from "sequelize";

const CompanyModel =  db.define('companies',{
    idCompany:{ type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true  },
    companyName:{ type: DataTypes.STRING},
    phone:{ type: DataTypes.STRING},
    email:{ type: DataTypes.STRING}
},{
    timestamps: false
});

export default CompanyModel;