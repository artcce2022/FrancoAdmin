//importamos conexion a bd
import db from "../database/db.js";
import { DataTypes } from "sequelize";
import SymptomsCategoriesModel from "./SymptomsCategoriesModel.js";

const CommonFailuresModel =  db.define('commonfailures',{
    idcommonfailures:{ type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true  },
    shortdescription:{ type: DataTypes.STRING},
    symtomdescription:{ type: DataTypes.STRING},
    workrequested:{ type: DataTypes.STRING},
    hours:{ type: DataTypes.STRING},
    price:{ type: DataTypes.NUMBER},
    idsymptomcategory:{ type: DataTypes.INTEGER}
},{
    timestamps: false
}); 
// Option 1
CommonFailuresModel.belongsTo(SymptomsCategoriesModel, {
    foreignKey: 'idsymptomcategory'
  }); 
//LocationsModel.belongsTo(CompanyModel);
export default CommonFailuresModel;