import db from "../database/db.js";
import { DataTypes } from "sequelize"; 
import ServicesModel from "./ServicesModel.js"; 
import EmployeeModel from "./EmployeeModel.js";

const ServiceLaborsModel =  db.define('servicelabors',{
    idservicelabor:{ type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true  },
        idservice:{ type: DataTypes.INTEGER},
        shortdescription:{ type: DataTypes.STRING},
        isincluded:{ type: DataTypes.BOOLEAN},
        visibletocustomer:{ type: DataTypes.BOOLEAN},
        isdeleted:{ type: DataTypes.BOOLEAN},
        price:{ type: DataTypes.DECIMAL},
        isexternal:{ type: DataTypes.BOOLEAN},
        idtechnician:{ type: DataTypes.INTEGER},
        idsupplier:{ type: DataTypes.INTEGER}
},{
    timestamps: false,freezeTableName: true
});
ServiceLaborsModel.belongsTo(ServicesModel, {
    foreignKey: 'idservice'
  });
  ServiceLaborsModel.belongsTo(EmployeeModel, {
      foreignKey: 'idtechnician'
    });  
 
//LocationsModel.belongsTo(CompanyModel);
export default ServiceLaborsModel; 
