//importamos conexion a bd
import db from "../database/db.js";
import { DataTypes } from "sequelize";

const ZipCodesModel =  db.define('uszips',{
    idzip:{ type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true },
    zip:{ type: DataTypes.STRING},
    lat:{ type: DataTypes.STRING},
    lng:{ type: DataTypes.STRING},
    city:{ type: DataTypes.STRING},
    state_id:{ type: DataTypes.STRING},
    state_name:{ type: DataTypes.STRING},
    county_fips:{ type: DataTypes.STRING},
    county_name:{ type: DataTypes.STRING} 
},{
    timestamps: false,freezeTableName: true
});


export default ZipCodesModel;
 