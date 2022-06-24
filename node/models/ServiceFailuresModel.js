//importamos conexion a bd
import db from "../database/db.js";
import { DataTypes } from "sequelize";
import CommonFailuresModel from "./CommonFailuresModel.js";
import ServicesModel from "./ServicesModel.js";
import CommonFailuresStatusModel from "./CommonFailuresStatusModel.js";

const ServiceFailuresModel =  db.define('servicefailures',{
    idservicefailures:{ type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true  },
        idservice:{ type: DataTypes.INTEGER},
        idcommonfailures:{ type: DataTypes.INTEGER},
        idcommonfailurestatus:{ type: DataTypes.INTEGER},
        comments:{ type: DataTypes.STRING}
},{
    timestamps: false,freezeTableName: true
});
ServiceFailuresModel.belongsTo(ServicesModel, {
    foreignKey: 'idservice'
  });
  ServiceFailuresModel.belongsTo(CommonFailuresModel, {
      foreignKey: 'idcommonfailures'
    });  

    ServiceFailuresModel.belongsTo(CommonFailuresStatusModel, {
        foreignKey: 'idcommonfailurestatus'
      });  
//LocationsModel.belongsTo(CompanyModel);
export default ServiceFailuresModel; 


/*
 `servicefailures` (
  `idservicefailures` bigint NOT NULL AUTO_INCREMENT,
  `idservice` int NOT NULL,
  `idcommonfailures` int NOT NULL,
  */