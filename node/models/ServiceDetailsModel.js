//importamos conexion a bd
import db from "../database/db.js";
import { DataTypes } from "sequelize";

const ServiceDetailsModel =  db.define('servicedetails',{
    idservicedetail:{ type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true  },
        idservice:{ type: DataTypes.INTEGER},
        detail:{ type: DataTypes.STRING}
},{
    timestamps: false,freezeTableName: true
});

//LocationsModel.belongsTo(CompanyModel);
export default ServiceDetailsModel; 