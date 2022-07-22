//importamos conexion a bd
import db from "../database/db.js";
import { DataTypes } from "sequelize"; 
import PartsModel from "./PartsModel.js";

const CommonFailuresPartsModel =  db.define('commonfailuresparts',{
    idcommonfailurespart:{ type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true  },
        idcommonfailures:{ type: DataTypes.INTEGER},
        idparts:{ type: DataTypes.INTEGER},         
        quantity:{ type: DataTypes.NUMBER}, 
        price:{ type: DataTypes.NUMBER},
        visibletocustomer:{ type: DataTypes.BOOLEAN},
        included:{ type: DataTypes.BOOLEAN} , 
        required:{ type: DataTypes.BOOLEAN}
},{
    timestamps: false,freezeTableName: true
});

// Option 1 
CommonFailuresPartsModel.belongsTo(PartsModel, {
    foreignKey: 'idparts'
  });
export default CommonFailuresPartsModel;