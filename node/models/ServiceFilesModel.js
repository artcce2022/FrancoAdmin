//importamos conexion a bd
import db from "../database/db.js";
import { DataTypes } from "sequelize";

const ServiceFilesModel =  db.define('servicefiles',{
    idservicefile:{ type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true  },
        idservice:{ type: DataTypes.INTEGER},
        path:{ type: DataTypes.STRING},
        filename:{ type: DataTypes.STRING},
        filetype:{ type: DataTypes.STRING},
        description:{ type: DataTypes.STRING},
        fileguid:{ type: DataTypes.STRING}
},{
    timestamps: false,freezeTableName: true
});

//LocationsModel.belongsTo(CompanyModel);
export default ServiceFilesModel; 