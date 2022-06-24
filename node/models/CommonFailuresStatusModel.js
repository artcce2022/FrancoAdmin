//importamos conexion a bd
import db from "../database/db.js";
import { DataTypes } from "sequelize";

const CommonFailuresStatusModel =  db.define('commonfailuresstatus',{
    idcommonfailuresstatus:{ type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true  },
    failurestatus:{ type: DataTypes.STRING},
    colorstatus:{ type: DataTypes.STRING}
},{
    timestamps: false,freezeTableName: true
});

//LocationsModel.belongsTo(CompanyModel);
export default CommonFailuresStatusModel;