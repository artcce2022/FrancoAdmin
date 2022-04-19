//importamos conexion a bd
import db from "../database/db.js";
import { DataTypes } from "sequelize";

const VendorModel =  db.define('vendor',{
    idvendor:{ type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true  },
    name:{ type: DataTypes.STRING},
    contact:{ type: DataTypes.STRING},
    address:{ type: DataTypes.STRING},
    zipcode:{ type: DataTypes.STRING},
    phone:{ type: DataTypes.STRING},
    extension:{ type: DataTypes.STRING},
    fax:{ type: DataTypes.STRING},
    email:{ type: DataTypes.STRING},
    terms:{ type: DataTypes.INTEGER},
    limits:{ type: DataTypes.STRING},
    comments:{ type: DataTypes.STRING}
},{
    timestamps: false,freezeTableName: true
});

//LocationsModel.belongsTo(CompanyModel);
export default VendorModel; 