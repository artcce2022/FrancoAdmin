//importamos conexion a bd
import db from "../database/db.js";
import { DataTypes } from "sequelize"; 

const CommonFailuresLaborsModel =  db.define('commonfailureslabors',{
    idcommonfailurelabor:{ type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true  },
    idcommonfailures:{ type: DataTypes.INTEGER},
    description:{ type: DataTypes.STRING},
    included:{ type: DataTypes.BOOLEAN},
    visibletocustomer:{ type: DataTypes.BOOLEAN}, 
    price:{ type: DataTypes.NUMBER}
},{
    timestamps: false
});  
//LocationsModel.belongsTo(CompanyModel);
export default CommonFailuresLaborsModel;