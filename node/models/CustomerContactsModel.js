//importamos conexion a bd
import db from "../database/db.js";
import { DataTypes } from "sequelize";
import CustomersModel from "./CustomersModel.js"

const CustomerContactsModel =  db.define('customercontacts',{
    idcustomercontact:{ type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true  },
    idCustomer:{type: DataTypes.INTEGER},
    name:{ type: DataTypes.STRING},
    lastname:{ type: DataTypes.STRING},
    title:{ type: DataTypes.STRING},
    phone:{ type: DataTypes.STRING},
    mobile:{ type: DataTypes.STRING},
    email:{ type: DataTypes.STRING},
    password:{ type: DataTypes.STRING} 
},{
    timestamps: false,freezeTableName: true
}); 
// Option 1
CustomerContactsModel.belongsTo(CustomersModel, {
    foreignKey: 'idcustomer'
  }); 
//LocationsModel.belongsTo(CompanyModel);
export default CustomerContactsModel;
 