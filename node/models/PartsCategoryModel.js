 
//importamos conexion a bd
import db from "../database/db.js";
import { DataTypes } from "sequelize";

const PartsCategoryModel =  db.define('partscategory',{
    idpartscategory:{ type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true  },
    category:{ type: DataTypes.STRING}
},{
    timestamps: false,freezeTableName: true
});

//LocationsModel.belongsTo(CompanyModel);
export default PartsCategoryModel;