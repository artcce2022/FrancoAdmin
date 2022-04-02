//importamos conexion a bd
import db from "../database/db.js";
import { DataTypes } from "sequelize";
import CustomersModel from "./CustomersModel.js"

const VehiclesModel =  db.define('vehicles',{
    idVehicle:{ type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true  },
    idCustomer:{type: DataTypes.INTEGER},
    vin:{ type: DataTypes.STRING},
    license:{ type: DataTypes.STRING},
    year:{ type: DataTypes.STRING},
    make:{ type: DataTypes.STRING},
    model:{ type: DataTypes.STRING},
    color:{ type: DataTypes.STRING},
    unit:{ type: DataTypes.STRING},
    memo:{ type: DataTypes.STRING}
},{
    timestamps: false,freezeTableName: true
}); 
// Option 1
VehiclesModel.belongsTo(CustomersModel, {
    foreignKey: 'idcustomer'
  }); 
//LocationsModel.belongsTo(CompanyModel);
export default VehiclesModel;