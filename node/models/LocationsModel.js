//importamos conexion a bd
import db from "../database/db.js";
import { DataTypes } from "sequelize";

const LocationsModel =  db.define('locations',{
    idLocation:{ type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true  },
    idCompany:{ type: DataTypes.INTEGER},
    locationName:{ type: DataTypes.STRING},
    address:{ type: DataTypes.STRING},
    phone:{ type: DataTypes.STRING},
    schedule:{ type: DataTypes.STRING},
    manager:{ type: DataTypes.STRING}
},{
    timestamps: false
});

//LocationsModel.belongsTo(CompanyModel);
export default LocationsModel;