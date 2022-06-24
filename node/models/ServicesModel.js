//importamos conexion a bd
import db from "../database/db.js";
import { DataTypes } from "sequelize";
import CustomersModel from "./CustomersModel.js";
import CompanyModel from "./CompanyModel.js";
import VehiclesModel from "./VehiclesModel.js";
import LocationsModel from "./LocationsModel.js";
import ServiceStatusModel from "./ServiceStatusModel.js";
import ServicePartsModel from "./ServicePartsModel.js";

const ServicesModel=  db.define('services',{
    idservice:{ type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true  },
    idcompany:{ type: DataTypes.INTEGER},
    idcustomer:{ type: DataTypes.INTEGER},
    idvehicle:{ type: DataTypes.INTEGER},
    idlocation:{ type: DataTypes.INTEGER},
    datecreate:{ type: DataTypes.DATE},
    iduser:{ type: DataTypes.INTEGER},
    recibe:{ type: DataTypes.STRING},
    comments:{ type: DataTypes.STRING},
    idservicestatus:{ type: DataTypes.INTEGER} ,
    serviceid:{ type: DataTypes.STRING}    
},{
    timestamps: false,freezeTableName: true
});

// Option 1
ServicesModel.belongsTo(CustomersModel, {
    foreignKey: 'idcustomer'
  }); 
ServicesModel.belongsTo(CompanyModel, {
    foreignKey: 'idCompany'
});  
ServicesModel.belongsTo(VehiclesModel, {
    foreignKey: 'idvehicle'
});  
ServicesModel.belongsTo(LocationsModel, {
    foreignKey: 'idlocation'
});    
ServicesModel.belongsTo(ServiceStatusModel, {
    foreignKey: 'idservicestatus'
});
 
// ServicesModel.belongsTo(ServicePartsModel , {
//     foreignKey: 'idserviceparts'
// });
//ServicesModel.hasMany(ServiceFailureModel)
export default ServicesModel;