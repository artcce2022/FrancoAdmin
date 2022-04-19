 

//importamos conexion a bd
import db from "../database/db.js";
import { DataTypes } from "sequelize";

const MovementTypesModel =  db.define('movementtypes',{
    idmovementtype:{ type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true  },
    movement:{ type: DataTypes.STRING}
},{
    timestamps: false,freezeTableName: true
});

//LocationsModel.belongsTo(CompanyModel);
export default MovementTypesModel;