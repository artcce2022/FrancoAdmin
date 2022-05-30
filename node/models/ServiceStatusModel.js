//importamos conexion a bd
import db from "../database/db.js";
import { DataTypes } from "sequelize";

const ServiceStatusModel =  db.define('servicestatus',{
    idservicestatus:{ type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true  },
    status:{ type: DataTypes.STRING}
},{
    timestamps: false,freezeTableName: true
});

//LocationsModel.belongsTo(CompanyModel);
export default ServiceStatusModel;