//importamos conexion a bd
import db from "../database/db.js";
import { DataTypes } from "sequelize";

const WarehouseModel =  db.define('warehouse',{
    idwarehouse:{ type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true  },
    idCompany:{ type: DataTypes.INTEGER},
    warehousename:{ type: DataTypes.STRING},
    address:{ type: DataTypes.STRING},
    phone:{ type: DataTypes.STRING}, 
    manager:{ type: DataTypes.STRING}
},{
    timestamps: false,freezeTableName: true
});

//LocationsModel.belongsTo(CompanyModel);
export default WarehouseModel;