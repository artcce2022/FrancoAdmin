//importamos conexion a bd
import db from "../database/db.js";
import { DataTypes } from "sequelize";
import PartsCategoryModel from "./PartsCategoryModel.js";
import WarehouseModel from "./WarehouseModel.js";

const PartsModel =  db.define('parts',{
    idparts:{ type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true  },
    partnumber:{ type: DataTypes.STRING},
    partcode:{ type: DataTypes.STRING},
    description:{ type: DataTypes.STRING},
    size:{ type: DataTypes.STRING},
    manufacturer:{ type: DataTypes.STRING},
    idpartcategory:{ type: DataTypes.INTEGER},
    idwarehouse:{ type: DataTypes.INTEGER},
    comments:{ type: DataTypes.STRING},
    istire:{ type: DataTypes.BOOLEAN},
    istaxable:{ type: DataTypes.BOOLEAN},
    isnewpart:{ type: DataTypes.BOOLEAN},
    isrebuild:{ type: DataTypes.BOOLEAN},
    lastcost:{ type: DataTypes.DECIMAL},
    price:{ type: DataTypes.DECIMAL},
    reorderpoint:{ type: DataTypes.INTEGER}
},{
    timestamps: false,freezeTableName: true
});

PartsModel.belongsTo(PartsCategoryModel, {
    foreignKey: 'idpartcategory'
  }); 
  PartsModel.belongsTo(WarehouseModel, {
    foreignKey: 'idwarehouse'
  }); 
export default PartsModel;  