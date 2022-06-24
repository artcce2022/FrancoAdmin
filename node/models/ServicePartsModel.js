//importamos conexion a bd
import db from "../database/db.js";
import { DataTypes } from "sequelize";
import PartsModel from "./PartsModel.js";
import VehiclesModel from "./VehiclesModel.js";
import WarehouseModel from "./WarehouseModel.js";
import EmployeeModel from "./EmployeeModel.js";  

const ServicePartsModel = db.define('serviceparts', {
    idserviceparts: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idservice: { type: DataTypes.INTEGER },
    idpart: { type: DataTypes.INTEGER },
    idvehicle: { type: DataTypes.INTEGER },
    idwarehouse: { type: DataTypes.INTEGER },
    request: { type: DataTypes.DATE },
    idemployee: { type: DataTypes.INTEGER },
    chargetocustomer: { type: DataTypes.BOOLEAN },
    price: { type: DataTypes.DECIMAL },
    idservicefailures: { type: DataTypes.INTEGER },
    serialnumber: { type: DataTypes.STRING},
    quantity: { type: DataTypes.DECIMAL}
}, {
    timestamps: false, freezeTableName: true
});

// Option 1
ServicePartsModel.belongsTo(PartsModel, {
    foreignKey: 'idpart'
});


ServicePartsModel.belongsTo(VehiclesModel, {
    foreignKey: 'idvehicle'
});

ServicePartsModel.belongsTo(WarehouseModel, {
    foreignKey: 'idwarehouse'
});

ServicePartsModel.belongsTo(EmployeeModel, {
    foreignKey: 'idemployee'
});

//LocationsModel.belongsTo(CompanyModel);
export default ServicePartsModel; 